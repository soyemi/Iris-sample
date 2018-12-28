
import * as iris from 'iris-gl';
import { CSGContainer, CSGBufferData } from "./PathTracer";

const sh_pathtracer = require('./res/pathtracer.glsl');
const sh_pathtracer_inc = require('./res/pathtracer.inc.glsl');

export class PathTracerPipeline extends iris.PipelineBase{

    private m_fbBack:WebGLFramebuffer;
    private m_fbFront:WebGLFramebuffer;

    private m_texBack:iris.Texture2D;
    private m_texFront:iris.Texture2D;
    private m_onfront:boolean = true;

    private static SH_PATHTRACER:iris.ShaderSource;

    private m_shader:iris.Shader;
    private m_meshrender:iris.MeshRender;
    private m_setup:boolean = false;

    private m_passOpaque:iris.PassOpaque;

    public drawRaster:boolean = false;

    private m_csgcontainer:CSGContainer;

    private m_csgbuffer:WebGLBuffer;

    private m_stateRaster:iris.ShaderTags;
    private m_stateTracer:iris.ShaderTags;

    private m_frame:number = 0;
    private m_maxFrame:number = 5000;

    public constructor(csgcontainer:CSGContainer){
        super();
        this.m_csgcontainer = csgcontainer;
        this.CSGBufferIndex = iris.PipelineBase.UNIFORMINDEX_SHADER;
        
    }
    public CSGBufferIndex:number;

    public async onInitGL(){
        super.onInitGL();

        const gl = this.gl;

        let fbwidth = this.mainFBwidth;
        let fbheight =this.mainFBheight;

        let desc:iris.TextureCreationDesc = {
            format:gl.RGB,
            internalformat:gl.RGB8
        };
        this.m_texBack = iris.Texture2D.createTexture2D(fbwidth,fbheight,desc,this.glctx);
        this.m_texFront = iris.Texture2D.createTexture2D(fbwidth,fbheight,desc,this.glctx);

        let fbback = gl.createFramebuffer();
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,fbback);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.m_texBack.getRawTexture(),0);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,null);
        this.m_fbBack = fbback;

        let fbfront = gl.createFramebuffer();
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,fbfront);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.m_texFront.getRawTexture(),0);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,null);
        this.m_fbFront = fbfront;

        if(PathTracerPipeline.SH_PATHTRACER == null){
            PathTracerPipeline.SH_PATHTRACER = await iris.ShaderSource.load(sh_pathtracer,'pathtracer');

            let variant_pathtracer = await iris.ShaderVariant.load(sh_pathtracer_inc,'VARIANT_PATH_TRACER');
            iris.ShaderFX.registVariant(variant_pathtracer);
            iris.ShaderFX.linkAllVariant();
        }

        if(this.m_shader ==null){
            this.m_shader = iris.ShaderFX.compileShaders(this.glctx,PathTracerPipeline.SH_PATHTRACER);
        }

        let mat = new iris.Material(this.m_shader);
        mat.setUniformBlockwitName(CSGBufferData.BUFFER_NAME,this.CSGBufferIndex);
        this.m_meshrender = new iris.MeshRender(iris.Mesh.Quad,mat);
        this.m_passOpaque = new iris.PassOpaque(this);

        if(this.m_csgbuffer == null){
            let buffer = gl.createBuffer();
            gl.bindBuffer(gl.UNIFORM_BUFFER,buffer);
            gl.bufferData(gl.UNIFORM_BUFFER,this.m_csgcontainer.data.fxbuffer.raw,gl.STATIC_DRAW);
            gl.bindBufferBase(gl.UNIFORM_BUFFER,iris.PipelineBase.UNIFORMINDEX_SHADER,buffer);
            gl.bindBuffer(gl.UNIFORM_BUFFER,null);
            this.m_csgbuffer = buffer;
        }

        //shader state

        let raster = new iris.ShaderTags();
        raster.blend = false;
        raster.ztest = iris.Comparison.LEQUAL;
        raster.zwrite=  true;
        raster.fillDefaultVal();
        this.m_stateRaster =raster;

        let tracer = new iris.ShaderTags();
        tracer.ztest = iris.Comparison.ALWAYS;
        tracer.zwrite = false;
        raster.blend = false;
        tracer.fillDefaultVal();

        gl.depthMask(true);
        gl.clearDepth(1.0);

        this.m_setup = true;
    }


    public resizeFrameBuffer(width: number, height: number) {
        super.resizeFrameBuffer(width,height);

        let gl = this.gl;
        
        this.m_fbBack = this.resizeBufferAndTex(this.m_fbBack,this.m_texBack,gl.COLOR_ATTACHMENT0,width,height);
        this.m_fbFront = this.resizeBufferAndTex(this.m_fbFront,this.m_texFront,gl.COLOR_ATTACHMENT0,width,height);
    }

    private resizeBufferAndTex(fb:WebGLFramebuffer,tex:iris.Texture2D,attatchment:number,w:number,h:number):WebGLFramebuffer{
        const gl = this.gl;
        if(fb != null) gl.deleteFramebuffer(fb);

        tex.resize(w,h,this.glctx);

        fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, fb);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, attatchment, gl.TEXTURE_2D, tex.getRawTexture(), 0);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);

        return fb;
    }

    public toggleRenderMode(){
        this.drawRaster = ! this.drawRaster;
    }

    public release(){
        if(!this.m_inited) return;
        super.release();

        const gl = this.gl;
        const glctx = this.glctx;
        if(this.m_fbBack != null){
            gl.deleteFramebuffer(this.m_fbBack);
            this.m_fbBack = null;
        }

        if(this.m_fbFront != null){
            gl.deleteFramebuffer(this.m_fbFront);
            this.m_fbFront = null;
        }

        if(this.m_texBack != null){
            this.m_texBack.release(glctx);
            this.m_texBack = null;
        }
        if(this.m_texFront != null){
            this.m_texFront.release(glctx);
            this.m_texFront = null;
        }
    }

    public exec(scene: iris.Scene){
        if(!this.m_setup) return;

        this.generateDrawList(scene);
        const gl = this.gl;
        let camera = scene.mainCamera;
        camera.aspect = this.mainFrameBufferAspect;

        let dirty = camera.isDataProjDirty || camera.isDataTrsDirty;
        if(dirty) this.m_frame = 1;

        this.updateShaderDataBasis(camera);
        const csgcontainer = this.m_csgcontainer;
        csgcontainer.data.setIter(this.m_frame);
        csgcontainer.updateUniformData(this.m_csgbuffer,gl);

        const statecache = this.stateCache;

        let drawRaster = this.drawRaster;
        let onfront = this.m_onfront;

        if(!drawRaster && this.m_frame < this.m_maxFrame){
            const render = this.m_meshrender;
            const mat = render.material;
            mat.setTexture(iris.ShaderFX.UNIFORM_MAIN_TEXTURE,onfront? this.m_texBack: this.m_texFront);
            mat.setFloat('seed',Math.random());
            statecache.apply(this.m_stateTracer);
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,onfront? this.m_fbFront : this.m_fbBack);
            this.drawMeshRender(this.m_meshrender);
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,null);
            this.m_onfront = ! this.m_onfront;
            this.m_frame ++;
        }
        
        this.bindTargetFrameBuffer(false,false);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        if(drawRaster){
            statecache.apply(this.m_stateRaster);
            this.m_passOpaque.render(scene);
        }
        else{
            this.drawFullScreenTex(onfront? this.m_texFront: this.m_texBack);
        }

        
    }

}
