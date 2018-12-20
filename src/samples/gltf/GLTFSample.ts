import { GraphicsRender, PipelineForwardZPrePass, Scene,glmath, SceneManager, Camera, CameraFreeFly, GLTFtool, GLTFSceneBuilder, Utility, ClearType, GameObject, Light, vec3, quat, GLTFdata } from 'iris-gl';
import { IProgram } from '../SampleProgram';
import { SampleResPack } from '../SampleResPack';

const scene_glb = require('./res/scene.glb');

class GLTFSampleResPack extends SampleResPack{
    public glftdata:GLTFdata;

    public constructor(){
        super();
    }

    protected async doLoad(): Promise<boolean> {
        this.glftdata = await GLTFtool.LoadGLTFBinary(scene_glb);
        return true;
    }
    
}

export class GLTFSample implements IProgram {
    private grender : GraphicsRender;
    private pipeline : PipelineForwardZPrePass;
    private m_scene : Scene;
    private m_sceneMgr : SceneManager;


    public static s_respack: GLTFSampleResPack = new GLTFSampleResPack();


    onSetupRender(grender : GraphicsRender) {
        this.grender = grender;
        let pipeline = new PipelineForwardZPrePass();
        grender.setPipeline(pipeline);
        this.pipeline = pipeline;
    }

    public onLoadRes(){
        return  GLTFSample.s_respack;
    }

    async onInit() {
        this.m_sceneMgr = new SceneManager();
    }

    async onSetupScene() {
        const pipeline = this.pipeline;

        let scene = new Scene();
        this.m_scene= scene;

        let gltfdata = GLTFSample.s_respack.glftdata;
        let sceneBuilder = new GLTFSceneBuilder(gltfdata,pipeline.GLCtx,this.grender.shaderLib);
        let gobj = sceneBuilder.createScene()

        let skyboxobj = gobj.getChildByName('sky_sky_0');
        if(skyboxobj!=null){
            let skyrender = skyboxobj.render;
            skyrender.castShadow = false;
            skyrender.material.setShader(this.grender.shaderLib.shaderUnlitTexture);
        }
        gobj.transform.parent =scene.transform;

        let camera = Camera.persepctive(null, 60, 400.0 / 300.0, 0.5, 1000);
        camera.transform.setPosition(glmath.vec3(5,-13, -15));
        camera.transform.applyRotate(quat.fromEulerDeg(-20,160,0));
        camera.transform.setLocalDirty();
        camera.ambientColor = Utility.colorRGBA(3, 110, 167, 15);
        camera.clearType = ClearType.Background;
        camera.background = glmath.vec4(1,0, 0, 1);
        camera.gameobject.addComponent(new CameraFreeFly());
        camera.gameobject.name = "camera";
        camera.transform.parent = scene.transform;

        let lightobj = new GameObject('light');
        let light0 = Light.creatDirctionLight(lightobj,1.0,glmath.vec3(0.5,-1,0.6));
        light0.lightColor = new vec3([1,1,1]);
        lightobj.transform.parent = scene.transform;
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
