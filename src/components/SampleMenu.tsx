import * as React from 'react';
import "./SampleMenu.css";

export interface SampleMenuProp {
    sampleEnter : {
        key: string,
        path: string
    }[];
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
                    <a key={i} className="menu-item">{item.key}</a>
                ))}
            </div>
        )
    }
}
