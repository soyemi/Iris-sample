import { PipelineBase,ShaderFX, Mesh, Material} from "iris-gl";
import { Texture, TextureCreationDesc } from "iris-gl/dist/Texture";
import { Scene } from "iris-gl/dist/Scene";
import { ShaderSource } from "iris-gl/dist/shaderfx/ShaderSource";
import { Shader } from "iris-gl/dist/shaderfx/Shader";
import { MeshRender } from "iris-gl/dist/MeshRender";

export class PathTracerPipeline extends PipelineBase{

    private m_fbBack?:WebGLFramebuffer;
    private m_fbFront:WebGLFramebuffer;

    private m_texBack:Texture;
    private m_texFront:Texture;

    private static SH_PATHTRACER:ShaderSource;

    private m_shader:Shader;

    private m_meshrender:MeshRender;

    private m_setup:boolean = false;

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
            PathTracerPipeline.SH_PATHTRACER = await ShaderSource.load('res/path-tracer/pathtracer.glsl','pathtracer');
        }

        if(this.m_shader ==null){
            this.m_shader = ShaderFX.compileShaders(this.glctx,PathTracerPipeline.SH_PATHTRACER);
        }

        let mat = new Material(this.m_shader);
        this.m_meshrender = new MeshRender(Mesh.Quad,mat);

        this.m_setup = true;
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
        let camera = scene.mainCamera;
        camera.aspect = this.mainFrameBufferAspect;
        this.updateUniformCamera(camera);
        
        this.bindTargetFrameBuffer();

        this.drawMeshRender(this.m_meshrender);
    }

}
