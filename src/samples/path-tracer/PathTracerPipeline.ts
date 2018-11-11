import { PipelineBase,ShaderFX, Mesh, Material, ShaderVariant, PassOpaque} from "iris-gl";
import { Texture, TextureCreationDesc } from "iris-gl/dist/Texture";
import { Scene } from "iris-gl/dist/Scene";
import { ShaderSource } from "iris-gl/dist/shaderfx/ShaderSource";
import { Shader, ShaderTags, Comparison } from "iris-gl/dist/shaderfx/Shader";
import { MeshRender } from "iris-gl/dist/MeshRender";
import { CSGContainer, CSGBufferData } from "./PathTracer";

const sh_pathtracer = require('./res/pathtracer.glsl');
const sh_pathtracer_inc = require('./res/pathtracer.inc.glsl');


export class PathTracerPipeline extends PipelineBase{

    private m_fbBack:WebGLFramebuffer;
    private m_fbFront:WebGLFramebuffer;

    private m_texBack:Texture;
    private m_texFront:Texture;
    private m_onfront:boolean = true;

    private static SH_PATHTRACER:ShaderSource;

    private m_shader:Shader;
    private m_meshrender:MeshRender;
    private m_setup:boolean = false;

    private m_passOpaque:PassOpaque;

    public drawRaster:boolean = false;

    private m_csgcontainer:CSGContainer;

    private m_csgbuffer:WebGLBuffer;

    private m_stateRaster:ShaderTags;
    private m_stateTracer:ShaderTags;

    private m_frame:number = 0;
    private m_maxFrame:number = 5000;

    public constructor(csgcontainer:CSGContainer){
        super();
        this.m_csgcontainer = csgcontainer;
        this.CSGBufferIndex = PipelineBase.UNIFORMINDEX_SHADER;
        
    }
    public CSGBufferIndex:number;

    public async init(){
        if(this.m_inited) return;
        super.init();

        const gl = this.gl;

        let fbwidth = this.mainFrameBufferWidth;
        let fbheight =this.mainFrameBufferHeight;

        let desc = new TextureCreationDesc(gl.RGB,gl.RGB8,false);
        this.m_texBack = Texture.createTexture2D(fbwidth,fbheight,desc,this.glctx);
        this.m_texFront = Texture.createTexture2D(fbwidth,fbheight,desc,this.glctx);

        let fbback = gl.createFramebuffer();
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,fbback);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.m_texBack.rawtexture,0);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,null);
        this.m_fbBack = fbback;

        let fbfront = gl.createFramebuffer();
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,fbfront);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.m_texFront.rawtexture,0);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,null);
        this.m_fbFront = fbfront;

        if(PathTracerPipeline.SH_PATHTRACER == null){
            PathTracerPipeline.SH_PATHTRACER = await ShaderSource.load(sh_pathtracer,'pathtracer');

            let variant_pathtracer = await ShaderVariant.load(sh_pathtracer_inc,'VARIANT_PATH_TRACER');
            ShaderFX.registVariant(variant_pathtracer);
            ShaderFX.linkAllVariant();
        }

        if(this.m_shader ==null){
            this.m_shader = ShaderFX.compileShaders(this.glctx,PathTracerPipeline.SH_PATHTRACER);
        }

        let mat = new Material(this.m_shader);
        mat.setUniformBlockwitName(CSGBufferData.BUFFER_NAME,this.CSGBufferIndex);
        this.m_meshrender = new MeshRender(Mesh.Quad,mat);
        this.m_passOpaque = new PassOpaque(this);

        if(this.m_csgbuffer == null){
            let buffer = gl.createBuffer();
            gl.bindBuffer(gl.UNIFORM_BUFFER,buffer);
            gl.bufferData(gl.UNIFORM_BUFFER,this.m_csgcontainer.data.fxbuffer.raw,gl.STATIC_DRAW);
            gl.bindBufferBase(gl.UNIFORM_BUFFER,PipelineBase.UNIFORMINDEX_SHADER,buffer);
            gl.bindBuffer(gl.UNIFORM_BUFFER,null);
            this.m_csgbuffer = buffer;
        }

        //shader state

        let raster = new ShaderTags();
        raster.blend = false;
        raster.ztest = Comparison.LEQUAL;
        raster.zwrite=  true;
        raster.fillDefaultVal();
        this.m_stateRaster =raster;

        let tracer = new ShaderTags();
        tracer.ztest = Comparison.ALWAYS;
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

    private resizeBufferAndTex(fb:WebGLFramebuffer,tex:Texture,attatchment:number,w:number,h:number):WebGLFramebuffer{
        const gl = this.gl;
        if(fb != null) gl.deleteFramebuffer(fb);

        tex.resize(w,h,this.glctx);

        fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, fb);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, attatchment, gl.TEXTURE_2D, tex.rawtexture, 0);
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

    public exec(scene: Scene){
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
            mat.setTexture(ShaderFX.UNIFORM_MAIN_TEXTURE,onfront? this.m_texBack: this.m_texFront);
            mat.setFloat('seed',Math.random());
            statecache.apply(this.m_stateTracer);
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,onfront? this.m_fbFront : this.m_fbBack);
            this.drawMeshRender(this.m_meshrender);
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,null);
            this.m_onfront = ! this.m_onfront;
            this.m_frame ++;
        }

        this.bindTargetFrameBuffer();
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