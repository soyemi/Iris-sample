import { IProgram } from '../SampleProgram';

import { GraphicsRender,PipelineForwardZPrePass,Component, Scene, Camera, Mesh, Material, SceneManager, CameraFreeFly, Input, quat, Light,SceneBuilder, LightType, glmath, ShaderFX } from 'iris-gl';
import { MeshRender } from 'iris-gl/dist/MeshRender';

export class CubeSample implements IProgram{

    private grender: GraphicsRender;

    private m_scene:Scene;
    private m_scenemgr:SceneManager;

    private m_render:MeshRender;

    

    public onSetupRender(grender:GraphicsRender){
        this.m_scenemgr = new SceneManager();
        this.grender = grender;
        grender.setPipeline(new PipelineForwardZPrePass());

    }


    public getCfgObject(){ return null;}

    public onLoadRes(){return null;}

    public onSetupScene(){
        const grender = this.grender;
        this.m_scene = SceneBuilder.Build({
            children: {
                "camrea": {
                    comp: [
                        Camera.persepctive(null,60, 400.0 / 300.0, 0.5, 1000),
                        new CameraFreeFly()
                    ],
                    trs: {pos:[0,1,0]}
                },
                "cube":{
                    comp: [<Component>{
                        onUpdate:function(scene:Scene){
                            let dt = Input.snapshot.deltaTime;
                            dt *= 30.0;
                            const rota = quat.fromEulerDeg(dt,-dt,-2 * dt);
                            let trs = this.gameobject.transform;
                            trs.applyRotate(rota);
                        }}],
                    render: new MeshRender(Mesh.Cube,new Material(grender.shaderLib.shaderDiffuse)),
                    trs: {pos:[0,0,-7]},
                    oncreate:(g)=>{g.render.material.setColor(ShaderFX.UNIFORM_MAIN_COLOR,glmath.vec4(1,1,1,1))}
                },
                "light":{
                    comp:[new Light(LightType.direction,1.0)],
                    oncreate:(g)=>{g.transform.forward =glmath.vec3(0,-1.0,0.1)}
                }
            }
        });
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
