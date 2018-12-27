import { IProgram } from '../SampleProgram';
import { SampleResPack } from '../SampleResPack';
import * as iris from 'iris-gl';
import { StackedPipeline } from 'iris-gl';

export class RenderPipelineSample implements IProgram{
    private m_grender:iris.GraphicsRender;
    private m_pipeline:iris.StackedPipeline;

    onLoadRes():SampleResPack{ return null;}
    getCfgObject(){return null;}

    onSetupRender(grender:iris.GraphicsRender){
        this.m_grender = grender;
        let pipeline =new StackedPipeline(null);
        this.m_grender.setPipeline(pipeline);
        this.m_pipeline = pipeline;
    }

    onSetupScene(){

    }

    onFrame(ts:number){
        const grender = this.m_grender;

        grender.render(null,ts);
        grender.renderToCanvas();
    }

    onRelease(){
        this.m_pipeline.release();
        this.m_grender.release();
        this.m_pipeline = null;
        this.m_grender = null;
    }
    
}