import { IProgram } from '../SampleProgram';
import { GraphicsRender, PipelineForwardZPrepass, Scene,glmath, SceneManager, Camera, CameraFreeFly, GLTFtool, GLTFSceneBuilder, Utility, ClearType } from 'iris-gl';

const scene_glb = require('./res/scene.glb');

export class GLTFSample implements IProgram {
    private grender : GraphicsRender;
    private pipeline : PipelineForwardZPrepass;
    private m_scene : Scene;
    private m_sceneMgr : SceneManager;

    onSetupRender(grender : GraphicsRender) {
        this.grender = grender;
        let pipeline = new PipelineForwardZPrepass();
        grender.setPipeline(pipeline);
        this.pipeline = pipeline;
    }

    async onInit() {
        this.m_sceneMgr = new SceneManager();
    }

    async onSetupScene() {
        const pipeline = this.pipeline;

        let scene = new Scene();
        this.m_scene= scene;
        let gltfdata = await GLTFtool.LoadGLTFBinary(scene_glb);
        let sceneBuilder = new GLTFSceneBuilder(gltfdata,pipeline.GLCtx,this.grender.shaderLib);
        sceneBuilder.createScene().transform.parent =scene.transform;

        let camera = Camera.persepctive(null, 60, 400.0 / 300.0, 0.5, 1000);
        camera.transform.setPosition(glmath.vec3(0,-500, 5));
        camera.transform.setLocalDirty();
        camera.ambientColor = Utility.colorRGBA(3, 110, 167, 15);
        camera.clearType = ClearType.Background;
        camera.background = glmath.vec4(0, 1, 0, 1);
        camera.gameobject.addComponent(new CameraFreeFly());
        camera.gameobject.name = "camera";
        camera.transform.parent = scene.transform;
    }
    onFrame(ts : number) {
        let scenemgr = this.m_sceneMgr;
        let scene = this.m_scene;

        const grender = this.grender;
        scenemgr.onFrame(scene);
        grender.render(scene, ts);
        this.m_sceneMgr.onFrame(scene);
        grender.render(scene,ts);
        grender.renderToCanvas();
    }
    onRelease() {}
}
