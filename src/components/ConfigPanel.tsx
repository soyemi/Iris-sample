import * as React from 'react';
import { WdigetField } from './WidgetField';
import { WidgetSlider, WidgetVec3, WidgetVec4, WidgetSwitch, WidgetRadio, WidgetConfig, WidgetColor } from './WidgetConfig';
import "./ConfigPanel.css";
import { Card } from 'antd';

export interface ConfigPanelState {
    widgetconfigs: WidgetConfig[];
}

export class ConfigPanel extends React.Component<{}, ConfigPanelState> {


    public constructor(prop) {
        super(prop);

        this.state = {
            widgetconfigs: [
                new WidgetSlider("AAAA", 20, 10, false),
                new WidgetVec3('Vec3', 0, 1, 2),
                new WidgetVec4('Vec4', 0, 1, 2, 3),
                new WidgetSwitch('switch', true),
                new WidgetRadio("SourceType", "Cubemap", ["Cubemap", "tex3d"]),
                new WidgetColor("Color",'#33ff00')
            ]
        }


    }
    public render() {

        return (
            <Card className="ConfigPanel">
                <div className="cfgpnl-wrap">
                {this.state.widgetconfigs.map((cfg) => (
                            <WdigetField key={cfg.label} config={cfg} />
                        ))}
                </div>
            </Card>
        )
    }
}
