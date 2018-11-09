import * as React from 'react';
import "./SampleMenu.css";

export interface SampleMenuProp {
    sampleEnter : {
        key: string,
        path: string
    }[];
    onMenuItemClick:(string)=>void;
}

export interface SampleMenuState {
    collapsed : boolean;
}

export class SampleMenu extends React.Component < SampleMenuProp,
SampleMenuState > {
    public constructor(prop : SampleMenuProp) {
        super(prop);
    }

    public render() {
        return (
            <div className="sample-menu">
                {this.props.sampleEnter.map((item,i)=>(
                    <a onClick={this.onItemClick} key={item.key} className="menu-item">{item.key}</a>
                ))}
            </div>
        )
    }

    public onItemClick = (e)=>{
        let sname = (e.target as HTMLElement).innerText;
        if(sname != null){
            this.props.onMenuItemClick(sname);
        }
    }
}
