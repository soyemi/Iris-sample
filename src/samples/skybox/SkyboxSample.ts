import { IProgram } from '../SampleProgram';
import * as iris from 'iris-gl';
import { PipelineForwardZPrePass, SceneManager } from 'iris-gl';

export class SkyboxSample implements IProgram{

    private grender:iris.GraphicsRender;
    private m_scene: iris.Scene;
    private m_scenemgr:iris.SceneManager;
    public onLoadRes(){
        return null;
    }

    public onSetupRender(grender:iris.GraphicsRender){
        this.grender = grender;
        grender.setPipeline(new PipelineForwardZPrePass());

        const gl = grender.glctx.gl;
        gl.clearColor(0.5,0.5,0.5,1.0);
    }

    public onInit(){
        this.m_scenemgr = new SceneManager();
    }



    public onSetupScene(){
        let scene = new iris.Scene();
        this.m_scene=  scene;

        let camera = iris.Camera.persepctive(null,60,1.0,0.05,100.0);
        camera.gameobject.addComponent(new iris.CameraFreeFly());
        camera.transform.parent = scene.transform;
        camera.skybox = iris.Skybox.createFromProcedural();
        camera.clearType = iris.ClearType.Skybox;
    }

    public onFrame(ts:number){
        const grender = this.grender;

        this.m_scenemgr.onFrame(this.m_scene);

        grender.render(this.m_scene,ts);
        grender.renderToCanvas();
    }

    public onRelease(){
        
    }
    
}
