import { PipelineForwardZPrePass } from 'iris-gl';
import { DefaultProgram } from '../DefaultProgram';

export class InstancingSample extends DefaultProgram<PipelineForwardZPrePass>{


    protected constructor(){
        super(PipelineForwardZPrePass);
    }

    public async onSetupScene(){
    }

    public onUpdate(ts:number){

    }


}
