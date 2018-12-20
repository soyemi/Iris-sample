import { GraphicsRender,GLUtility, FrameTimer, Input, WindowUtility} from 'iris-gl';
import { SAMPLES_ENTRY } from './SamplesEntry';
import { SampleResPack } from './SampleResPack';

export interface IProgram{
    onLoadRes():SampleResPack;
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

    private m_cursname:string;

    public get cursname():string {return this.m_cursname;}

    public static get Samples():{[name:string]:any}{
        return SampleRunner.s_samples;
    }

    public constructor(canvas:HTMLCanvasElement){
        this.m_timer = new FrameTimer(false);
        this.m_canvas = canvas;
        const grender = new GraphicsRender(canvas);
        this.m_graphicsRender = grender;
        Input.init(canvas);
        GLUtility.setTargetFPS(60);
        GLUtility.registerOnFrame(this.onFrame.bind(this));
        WindowUtility.setOnResizeFunc(this.onResize.bind(this));
    }

    public async LoadInitSample(sname?:string){
        if(sname == null || SampleRunner.s_samples[sname] == null) sname = SampleRunner.s_startSample;
        await this.LoadSample(sname);
    }

    private onResize(){
        const canvas = this.m_canvas;
        const grender = this.m_graphicsRender;

        let width = canvas.clientWidth;
        let height = canvas.clientHeight;
        grender.resizeCanvas(width,height);
    }

    public onFrame(ts:number){
        let delta = this.m_timer.tick(ts);
        let dt = delta/ 1000;

        let program =this.m_curprogram;
        if(program == null) return;
        Input.onFrame(dt);
        program.onFrame(dt);
    }

    public static registerSample(target:any,name){
        SampleRunner.s_samples[name] = target.prototype;
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

        let curprogram = this.m_curprogram;
        if(curprogram !=null){
            if(Object.getPrototypeOf(curprogram) == sproto){
                return false;
            }
            curprogram.onRelease();
            this.m_curprogram = null;
        }

        const grender= this.m_graphicsRender;
        let program = <IProgram>Object.create(sproto);

        let res = program.onLoadRes();
        if(res != null && !res.isLoaded){
            let loaded = await res.load();
            if(!loaded) return false;
        }

        await program.onInit();
        await program.onSetupRender(grender);
        await program.onSetupScene();

        this.m_curprogram = program;

        this.onResize();

        this.m_cursname = sname;

        return true;
    }
}

SampleRunner.Setup();
