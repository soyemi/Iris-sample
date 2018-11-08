// import {IProgram, SampleProgram} from "../SampleProgram";
// import {GraphicsRender, Camera, CameraFreeFly, SceneManager} from "iris-gl";
// import {PathTracerPipeline} from "./PathTracerPipeline";
// import {Scene} from "iris-gl/dist/Scene";

// @SampleProgram('Path Tracer')
// export class PathTracer implements IProgram {

//     private grender : GraphicsRender;
//     private pipeline : PathTracerPipeline;

//     private m_scene : Scene;
//     private m_sceneMgr : SceneManager;

//     onSetupRender(grender : GraphicsRender) {
//         this.grender = grender;
//         let pipeline = new PathTracerPipeline();
//         grender.setPipeline(pipeline);
//         this.pipeline = pipeline;
//     }

//     onInit() {
//         this.m_sceneMgr = new SceneManager();
//     }

//     onSetupScene() {

//         let scene = new Scene();
//         let camera = Camera.persepctive(null, 60, 1.0, 0.1, 100.0);
//         camera
//             .gameobject
//             .addComponent(new CameraFreeFly());
//         camera.transform.parent = scene.transform;

//         this.m_scene = scene;

//         console.log(this.pipeline);

//     }
//     onFrame(ts : number) {
//         const grener = this.grender;
//         const scenemgr = this.m_sceneMgr;

//         scenemgr.onFrame(this.m_scene);

//         this
//             .grender
//             .render(this.m_scene, ts);

//     }
//     onRelease() {}
// }
