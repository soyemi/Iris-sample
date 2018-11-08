// tslint:disable:max-classes-per-file

export enum WidgetType{
    Slider,
    Vec3,
    Vec4,
    Switch,
    Radio,
    Color,
}


export type WidgetCallback = (c:WidgetConfig) =>void;

export class WidgetConfig{
    public label:string;
    public type:WidgetType;
    public callback?:WidgetCallback;
    public value:any;

    public constructor(label:string,type:WidgetType,value?:any,callback?:WidgetCallback){
        this.label =label;
        this.type = type;
        this.value = value;
        this.callback = callback;
    }

    public emitChange(){
        if(this.callback != null){
            this.callback(this);
        }
    }
}


export class WidgetSlider extends WidgetConfig{
    public max:number = 0;
    public min:number = 1;
    public isInt:boolean;
    public constructor(label:string,max:number,min:number,isInt:boolean,value?:number,callback?:WidgetCallback){
        super(label,WidgetType.Slider,value == null? min:value,callback);
        this.max = max;
        this.min= min;
        this.isInt = isInt;
    }
}

export class WidgetVec3 extends WidgetConfig{
    public x:number;
    public y:number;
    public z:number;
    public constructor(label:string,x:number,y:number,z:number,callback?:WidgetCallback){
        super(label,WidgetType.Vec3,null,callback);
        this.x = x;
        this.y = y;
        this.z = z;
    }
}


export class WidgetVec4 extends WidgetConfig{
    public x:number;
    public y:number;
    public z:number;
    public w:number;
    public constructor(label:string,x:number,y:number,z:number,w:number,callback?:WidgetCallback){
        super(label,WidgetType.Vec4,null,callback);
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}

export class WidgetColor extends WidgetConfig{
    public constructor(label:string,value:string,callback?:WidgetCallback){
        super(label,WidgetType.Color,value,callback);
    }
}



export class WidgetSwitch extends WidgetConfig{
    public constructor(label:string,value:boolean= true,callback?:WidgetCallback){
        super(label,WidgetType.Switch,value,callback);
    }
}

export class WidgetRadio extends WidgetConfig{
    public options:string[];

    public constructor(label:string,value:string,options:string[],callback?:WidgetCallback){
        super(label,WidgetType.Radio,value,callback);
        this.options = options;

    }
}
