import { IProgram } from '../SampleProgram';
import { SampleResPack } from '../SampleResPack';
import { ShadowmapSamplePipeline } from './ShadowmapSamplePipeline';
import * as iris from 'iris-gl';

export class ShadowmapSample implements IProgram{

    private m_grender:iris.GraphicsRender;
    private m_pipeline:ShadowmapSamplePipeline;

    private m_camera:iris.Camera;
    private m_scene:iris.Scene;
    private m_scenemgr:iris.SceneManager;

    onLoadRes(): SampleResPack {
        return null;
    }    
    getCfgObject() {
        return null;
    }
    onSetupRender(grender: iris.GraphicsRender) {
        this.m_grender = grender;
        let pipeline = new ShadowmapSamplePipeline();
        grender.setPipeline(pipeline);
        this.m_pipeline = pipeline;

        this.m_scenemgr = new iris.SceneManager();
    }
    onSetupScene() {
        let scene = new iris.Scene();
        let camera = iris.Camera.persepctive(null,60,400.0/300.0,0.5,200);
        camera.transform.parent = scene.transform;
        camera.clearType= iris.ClearType.Background;
        camera.background = iris.vec4.zero;
        this.m_scene = scene;
        this.m_camera = camera;
        this.m_camera.skybox= null;

        let cube = new iris.GameObject('cube');
        let mat= new iris.Material(this.m_grender.shaderLib.shaderDiffuse);
        mat.setColor(iris.ShaderFX.UNIFORM_MAIN_COLOR,iris.vec4.one);
        cube.render = new iris.MeshRender(iris.Mesh.Cube,mat);
        cube.transform.setPosition(iris.glmath.vec3(5,2,5));
        cube.transform.parent = scene.transform;

        let light = iris.Light.creatDirctionLight(new iris.GameObject('light'),1.0,iris.glmath.vec3(0,-1,-0.5));
        light.gameobject.transform.parent = scene.transform;
    }
    onFrame(ts: number) {
        const grender = this.m_grender;

        const scene = this.m_scene;
        this.m_scenemgr.onFrame(scene);

        grender.render(scene,ts);
        grender.renderToCanvas();

    }
    onRelease() {
        this.m_camera = null;
        this.m_scene= null;
        this.m_scenemgr = null;
        
        this.m_pipeline.release();
        this.m_grender.release();
    }


}