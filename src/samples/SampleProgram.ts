import { GraphicsRender,GLUtility, FrameTimer, Input, WindowUtility} from 'iris-gl';
import { SAMPLES_ENTRY } from './SamplesEntry';

export interface IProgram{
    onInit();
    onSetupRender(grender:GraphicsRender);
    onSetupScene();
    onFrame(ts:number);
    onRelease();
}


export class SampleRunner{
    private static s_samples:{[name:string]:any} = {};
    private static s_setup:boolean = false;
    private static s_startSample:string;

    private m_canvas:HTMLCanvasElement;
    private m_graphicsRender:GraphicsRender;
    private m_curprogram:IProgram;
    private m_timer:FrameTimer;

    public static get Samples():{[name:string]:any}{
        return SampleRunner.s_samples;
    }

    public constructor(canvas:HTMLCanvasElement){

        this.m_timer = new FrameTimer(false);

        this.m_canvas = canvas;
        const grender = new GraphicsRender(canvas);
        this.m_graphicsRender = grender;

        let sname= SampleRunner.s_startSample;
        this.LoadSample(sname);
    }

    private onResize(){
        const canvas = this.m_canvas;
        const grender = this.m_graphicsRender;
        grender.resizeCanvas(canvas.clientWidth,canvas.clientHeight);
    }

    public onFrame(ts:number){
        let delta = this.m_timer.tick(ts);

        let dt = delta/ 1000;
        Input.onFrame(dt);

        let program =this.m_curprogram;
        program.onFrame(dt);
    }

    public static registerSample(target:any,name){
        SampleRunner.s_samples[name] = target;
        if(SampleRunner.s_startSample == null){
            SampleRunner.s_startSample = name;
        }
    }

    public static Setup(){
        if(SampleRunner.s_setup) return;
        const entries = SAMPLES_ENTRY;
        for (const name in entries) {
            if (entries.hasOwnProperty(name)) {
                const entry = entries[name];
                SampleRunner.registerSample(entry,name);
            }
        }
        SampleRunner.s_setup = true;

    }

    public async LoadSample(sname:string):Promise<boolean>{
        let sproto = SampleRunner.s_samples[sname];
        if(sproto == null) return false;

        const grender= this.m_graphicsRender;
        let program = <IProgram>Object.create(sproto.prototype);
        await program.onInit();
        await program.onSetupRender(grender);
        await program.onSetupScene();

        this.m_curprogram = program;

        GLUtility.setTargetFPS(60);
        GLUtility.registerOnFrame(this.onFrame.bind(this));

        this.onResize();
        WindowUtility.setOnResizeFunc(this.onResize.bind(this));

        return true;
    }
}

SampleRunner.Setup();
