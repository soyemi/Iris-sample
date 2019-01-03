import { IProgram } from '../SampleProgram';
import * as iris from 'iris-gl';
import { SampleResPack } from '../SampleResPack';

const GL = iris.GL;
const glmath = iris.glmath;
const quat = iris.quat;

export class LightingSample implements IProgram{

    private m_scene:iris.Scene;
    private m_sceneMgr:iris.SceneManager;
    private m_graphicsRender:iris.GraphicsRender;

    onLoadRes(): SampleResPack {
        return null;
    }    
    getCfgObject() {
        return null;
    }
    onSetupRender(grender: iris.GraphicsRender) {
        this.m_sceneMgr = new iris.SceneManager();
        this.m_graphicsRender = grender;
        grender.setPipeline(new iris.StackedPipeline({
            passes: [
                iris.PassOpaque,
                iris.PassSkybox,
                iris.PassGizmos,
            ],
            clearinfo: {
                clearMask: GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT,
                color: iris.glmath.vec4(0,0,0,1),
                depth: 1000
            }
        }))
    }
    onSetupScene() {
        const grender =this.m_graphicsRender;
        this.m_scene = iris.SceneBuilder.Build({
            "children":{
                "camera":{
                    comp:[
                        iris.Camera.persepctive(null,60.0,1.0,0.1,50),
                        new iris.CameraFreeFly()
                    ],
                    oncreate:(g)=>{
                        g.transform.applyTranslate(glmath.vec3(7,30.0,7));
                        g.transform.setRotation(quat.fromEulerDeg(-70.0,30.0,0));
                        let camera = g.getComponent(iris.Camera);
                        camera.clearType = iris.ClearType.Skybox;
                        camera.skybox = iris.Skybox.createFromProcedural();
                    }
                },
                "cube":{
                    trs: {pos:[2,1,-5]},
                    oncreate:(g)=>{
                        g.transform.applyRotate(quat.Random());
                        let cmat =new iris.Material(grender.shaderLib.shaderDiffuse);
                        cmat.setColor(iris.ShaderFX.UNIFORM_MAIN_COLOR,glmath.vec4(0.5,0.5,0.5,1));
                        g.render = new iris.MeshRender(iris.Mesh.Cube,cmat)
                    }
                },
                "cube_1":{
                    trs: {pos:[-1,1,3]},
                    oncreate:(g)=>{
                        g.transform.applyRotate(quat.Random());
                        let cmat =new iris.Material(grender.shaderLib.shaderDiffuse);
                        cmat.setColor(iris.ShaderFX.UNIFORM_MAIN_COLOR,glmath.vec4(0.7,0.7,0.7,1.0));
                        g.render = new iris.MeshRender(iris.Mesh.Cube,cmat)
                    }
                },
                "plane": {
                    oncreate:(g)=>{
                        g.transform.applyRotate(quat.fromEulerDeg(90,0,0));
                        g.transform.applyScale(glmath.vec3(20,20,1));
                        let cmat = new iris.Material(grender.shaderLib.shaderDiffuse);
                        cmat.setColor(iris.ShaderFX.UNIFORM_MAIN_COLOR,glmath.vec4(1,1,1,1.0));
                        g.render = new iris.MeshRender(iris.Mesh.Quad,cmat);
                    }
                },
                "pointlight_1":{
                    trs:{ pos:[3,3,3]},
                    oncreate:(g)=>{
                        iris.Light.createPointLight(g,10.0,null,1.0,glmath.vec3(1.0,0,0));
                    }
                },
                "pointlight_2":{
                    trs:{ pos:[-3,5,-5]},
                    oncreate:(g)=>{
                        iris.Light.createPointLight(g,10.0,null,1.0,glmath.vec3(0,1.0,0));
                    }
                },
                "pointlight_3":{
                    trs:{ pos:[-3,4,5]},
                    oncreate:(g)=>{
                        iris.Light.createPointLight(g,10.0,null,1.0,glmath.vec3(0,0,1.0));
                    }
                }
            }
        })

    }
    onFrame(ts: number) {
        const grender = this.m_graphicsRender;
        const scene = this.m_scene;
        const scenemgr = this.m_sceneMgr;
        scenemgr.onFrame(scene);

        grender.render(scene,ts);
        grender.renderToCanvas();
    }
    onRelease() {
    }



    
}