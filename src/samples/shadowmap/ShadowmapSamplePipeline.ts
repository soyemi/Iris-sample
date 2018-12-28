import * as iris from 'iris-gl';

export class ShadowmapSamplePipeline extends iris.PipelineBase{
 
    private m_passDepth:iris.PassDepth;
    private m_passOpaque:iris.PassOpaque;

    
    public async onInitGL(){
        super.onInitGL();
        this.m_passDepth = new iris.PassDepth(this);
        this.m_passOpaque = new iris.PassOpaque(this);
    }
    

    public exec(scene:iris.Scene){
        if(scene == null) return;

        this.generateDrawList(scene);
        
        this.m_passDepth.render(scene);
        this.m_passOpaque.render(scene);

    }

    public release(){
        super.release();

        this.m_passDepth = iris.RenderPass.Release(this.m_passDepth);
        this.m_passOpaque = iris.RenderPass.Release(this.m_passOpaque);
    }
}
