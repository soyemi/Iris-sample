import * as React from 'react';
import { WgtPanel, WgtFormContainer } from 'react-wgtui';

export class ConfigObj{
    fieldmap:{[label:string]:ConfigFieldSetting};
    public onConfigChange(key:string){};
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

        let fields:React.ReactNode[] = [];

        const cfgobj = this.state.cfgobj;
        if(cfgobj != null){
            let fields = cfgobj['fieldmap'];
            if(fields != null){
            }
        }

        return (
        <div>
            <WgtPanel>
                <WgtFormContainer>
                    {
                        fields
                    }
                </WgtFormContainer>
            </WgtPanel>
        </div>
        );
    }

    public setConfigObject(cfgobj:ConfigObj){

    }


    public static FieldFloat(label:string,min:number= 0.0,max:number = 1.0){
        return function(target:ConfigObj,key:string){
            target.fieldmap[key] = {
                type: ConfigFieldType.Float,
                label:label
            };
        }
    }
    
    public static FieldSelect(label:string,options:string[]){
        return function(target:ConfigObj,key:string){
            target.fieldmap[key] = {
                type:ConfigFieldType.Select,
                label:label
            };
        }
    }

    public static FieldToggle(label:string){
        return function(target:ConfigObj,key:string){
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
}
