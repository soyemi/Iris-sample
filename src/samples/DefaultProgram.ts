import { IProgram } from './SampleProgram';
import { GraphicsRender, IRenderPipeline, SceneManager, Scene } from 'iris-gl';

export abstract class DefaultProgram<T extends IRenderPipeline> implements IProgram{
    protected grender:GraphicsRender;
    protected m_sceneMgr:SceneManager;
    protected m_scene:Scene;
    protected m_pipeline:T;

    protected constructor(p:new ()=>T){
        this.m_pipeline = new p();
    }

    onInit() {
        this.m_sceneMgr = new SceneManager();
        this.m_scene= new Scene();
    }    
    public onSetupRender(grender:GraphicsRender){
        this.grender = grender;
        grender.setPipeline(this.m_pipeline);
    }
    public async abstract onSetupScene();
    onFrame(ts: number) {
        const scenemgr = this.m_sceneMgr;
        const scene = this.m_scene;
        if(scene == null) return;
        const grender = this.grender;
        this.onUpdate(ts);
        scenemgr.onFrame(scene);
        this.m_sceneMgr.onFrame(scene);
        grender.render(scene,ts);
        grender.renderToCanvas();
    }

    protected abstract onUpdate(ts:number);
    public onRelease() {
    }

}
