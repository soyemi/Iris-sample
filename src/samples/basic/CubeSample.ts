import { IProgram } from '../SampleProgram';
import { GraphicsRender,PipelineForwardZPrePass,Component, Scene, Camera, glmath, GameObject, Mesh, Material, ShaderFX, SceneManager, CameraFreeFly, Input, quat, Light, ClearType, vec4 } from 'iris-gl';
import { MeshRender } from 'iris-gl/dist/MeshRender';

export class CubeSample implements IProgram{

    private grender: GraphicsRender;

    private m_scene:Scene;
    private m_scenemgr:SceneManager;

    private m_render:MeshRender;

    public onSetupRender(grender:GraphicsRender){
        this.grender = grender;
        grender.setPipeline(new PipelineForwardZPrePass());
    }

    public onCfgObject(){ return null;}

    public onLoadRes(){return null;}

    public onInit(){
        this.m_scenemgr = new SceneManager();
    }

    public onSetupScene(){
        const grender = this.grender;

        let scene = new Scene();
        this.m_scene = scene;
        
        let camera = Camera.persepctive(null, 60, 400.0 / 300.0, 0.5, 1000);
        camera.transform.setPosition(glmath.vec3(0,1, 0));
        camera.transform.setLocalDirty();
        camera.transform.parent = scene.transform;
        camera.clearType = ClearType.Background;
        camera.background = vec4.zero;
        camera.gameobject.addComponent(new CameraFreeFly());

        let cube = new GameObject('cube');
        let mat = new Material(grender.shaderLib.shaderDiffuse);
        mat.setColor(ShaderFX.UNIFORM_MAIN_COLOR,glmath.vec4(1,1,1,1));
        let render = new MeshRender(Mesh.Cube,mat);
        this.m_render = render;
        cube.render = render;
        cube.transform.setPosition(glmath.vec3(0,0,-7));
        cube.addComponent(<Component>{
            onUpdate:function(scene:Scene){
                let dt = Input.snapshot.deltaTime;
                dt *= 30.0;
                const rota = quat.fromEulerDeg(dt,-dt,-2 * dt);
                let trs = this.gameobject.transform;
                trs.applyRotate(rota);
            }
        })
        cube.transform.parent = scene.transform;

        let lobj = new GameObject('loght')
        let light = Light.creatDirctionLight(lobj,1.0,glmath.vec3(0,-1,0.1));
        light.gameobject.transform.parent = scene.transform;
    }

    public onFrame(ts:number){
        const grender = this.grender;
        const gl = grender.glctx.gl;

        gl.clearColor(0,1,1,1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        const scene = this.m_scene;
        const scenemgr = this.m_scenemgr;
        scenemgr.onFrame(scene);

        grender.render(scene,ts);
        grender.renderToCanvas();
    }

    public onRelease(){
        const grender = this.grender;
        const glctx = grender.glctx;
        if(this.m_render != null){
            this.m_render.release(glctx);
            this.m_render = null;
        }
        this.m_scene = null;
        this.m_scenemgr = null;
        this.grender = null;
    }
}
