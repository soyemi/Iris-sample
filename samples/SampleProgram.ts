import{ GraphicsRender, FrameTimer, GLUtility, Input} from 'iris';

export interface IProgram{

    onInit();
    onSetupRender(grender:GraphicsRender);
    onSetupScene();
    onFrame(ts:number);

    onRelease();
}

export function SampleProgram(name:string){
    return function(constructor: Function){
        SampleRunner.registerSample(constructor.prototype,name);
    }
}

export class SampleRunner{

    private static samples:{[name:string]:any} = {};
    private static s_startSample:string;

    private m_canvas:HTMLCanvasElement;
    private m_graphicsRender:GraphicsRender;

    private m_curprogram:IProgram;

    private m_timer:FrameTimer;

    public constructor(canvas:HTMLCanvasElement){
        this.m_timer = new FrameTimer(false);

        this.m_canvas = canvas;
        let grender = new GraphicsRender(canvas);
        this.m_graphicsRender = grender;

        let sname= SampleRunner.s_startSample;
        let sproto = SampleRunner.samples[sname];

        if(sproto == null) return;
        let program = <IProgram>Object.create(sproto);
        program.onInit();
        program.onSetupRender(grender);
        program.onSetupScene();

        this.m_curprogram = program;

        GLUtility.setTargetFPS(60);
        GLUtility.registerOnFrame(this.onFrame.bind(this));
    }

    public onFrame(ts:number){
        let delta = this.m_timer.tick(ts);
        Input.onFrame(delta/1000);

        let program =this.m_curprogram;
        program.onFrame(ts);
    }

    public static registerSample(target:any,name:string){
        SampleRunner.samples[name] = target;
        if(SampleRunner.s_startSample == null){
            SampleRunner.s_startSample = name;
        }
    }
}
