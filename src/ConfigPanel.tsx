import * as React from 'react';
import { WgtPanel, WgtFormContainer, WgtFormItem, WgtSelect } from 'react-wgtui';
import "./ConfigPanel.less";

export class ConfigObj{
    fieldmap:{[label:string]:ConfigFieldSetting} ={};
    public onConfigChange(key:string,newval:any){};


    public static getWgtFields(cfgobj: ConfigObj){
        let proto = Object.getPrototypeOf(cfgobj);
        var fieldmap:{[label:string]:ConfigFieldSetting} = proto.fieldmap;

        let wgts:React.ReactNode[] = [];

        for (const key in fieldmap) {
            if (fieldmap.hasOwnProperty(key)) {
                const field = fieldmap[key];
                wgts.push(ConfigObj.getWidget(field,cfgobj));
            }
        }

        return wgts;
    }

    private static getWidget(fieldset:ConfigFieldSetting,cfgobj:ConfigObj){
        const wgttype = fieldset.type;
        const wgtkey = fieldset.label;
        let field = null;
        switch(wgttype){
            case ConfigFieldType.Float:
            break;
            case ConfigFieldType.Select:
                const opts = [];
                fieldset.extra.forEach(element => {
                    opts.push({
                        value: element
                    });
                });
                field = (<WgtSelect opts={opts} onValueChange={(val)=>cfgobj.onConfigChange(wgtkey,val)}></WgtSelect>)
            break;
            case ConfigFieldType.Toggle:
            break;
        }
        return (
            <WgtFormItem key={wgtkey} label={wgtkey}>
                {field}
            </WgtFormItem>
        )
    }
}

interface ConfigPanelStates{
    cfgobj?:ConfigObj;
}

export class ConfigPanel extends React.Component<{},ConfigPanelStates>{
    public constructor(prop:any){
        super(prop);
        this.state = {
            cfgobj:null
        };
    }


    public render(){
        let fields:React.ReactNode[] = null;
        const cfgobj = this.state.cfgobj;
        if(cfgobj != null){
            fields = ConfigObj.getWgtFields(cfgobj);
        }
        else{
            return null;
        }
        return (
            <div className="cfgpnl">
                <WgtPanel>
                    <WgtFormContainer>{fields}</WgtFormContainer>
                </WgtPanel>
            </div>
        );
    }

    public setConfigObject(cfgobj:ConfigObj){
        if(cfgobj != this.state.cfgobj){
            this.setState({
                cfgobj: cfgobj
            });
        }
    }

    public static FieldFloat(label:string,min:number= 0.0,max:number = 1.0){
        return function(target:ConfigObj,key:string){
            if(target.fieldmap == null) target.fieldmap = {};
            target.fieldmap[key] = {
                type: ConfigFieldType.Float,
                label:label
            };
        }
    }
    
    public static FieldSelect(label:string,options:string[]){
        return function(target:ConfigObj,key:string){
            console.log("regist selector", target,key);
            if(target.fieldmap == null) target.fieldmap = {};
            target.fieldmap[key] = {
                type:ConfigFieldType.Select,
                label:label,
                extra:options
            };
        }
    }

    public static FieldToggle(label:string){
        return function(target:ConfigObj,key:string){
            if(target.fieldmap == null) target.fieldmap = {};
            target.fieldmap[key] = {
                type: ConfigFieldType.Toggle,
                label:label
            };
        }
    }
}

export enum ConfigFieldType{
    Toggle,
    Float,
    Select,
}

interface ConfigFieldSetting{
    type:ConfigFieldType;
    label:string;
    extra?:any;
}
