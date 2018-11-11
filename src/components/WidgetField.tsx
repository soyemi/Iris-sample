import * as React from 'react';
import { WidgetConfig, WidgetType, WidgetSlider, WidgetVec3, WidgetVec4, WidgetSwitch, WidgetRadio, WidgetColor } from './WidgetConfig';
import { Slider, InputNumber, Row, Col, Switch, Radio, Popover } from 'antd';
import { ChromePicker } from 'react-color';
import "./WidgetField.css";

interface WidgetFieldProp {
    config: WidgetConfig;
}

interface WidgetFieldState {
    config: WidgetConfig;
}


export class WdigetField extends React.Component<WidgetFieldProp, WidgetFieldState>{

    public constructor(prop: WidgetFieldProp) {
        super(prop);
        this.state = {
            config: prop.config,
        }
    }

    public onValueChange = (v, i: number = 0) => {

        const cfg = this.state.config;

        switch (cfg.type) {
            case WidgetType.Slider:
                {
                    const cfgt = (cfg as WidgetSlider);
                    if (typeof v !== 'number') {
                        v = cfgt.min;
                    }
                    this.state.config.value = v;
                }
                break;
            case WidgetType.Vec3:
                {
                    const cfgt = (cfg as WidgetVec3);
                    if (typeof i !== 'number') {
                        i = 0;
                    }
                    const map = ['x', 'y', 'z'];
                    cfgt[map[v]] = i;

                }
                break;
            case WidgetType.Vec4:
                {
                    const cfgt = (cfg as WidgetVec4);
                    if (typeof i !== 'number') {
                        i = 0;
                    }
                    const map = ['x', 'y', 'z', 'w'];
                    cfgt[map[v]] = i;

                }
                break;
            case WidgetType.Switch:
                {
                    const cfgt = (cfg as WidgetSwitch);
                    cfgt.value = v;
                }
                break;
            case WidgetType.Radio:
                {
                    cfg.value = v.target.value;
                }
                break;
            case WidgetType.Color:
                {
                    cfg.value = v.hex;
                }
                break;
        }

        this.setState({
            config: this.state.config
        })
        cfg.emitChange();
    }

    public getComp(config: WidgetConfig) {

        const InputStyle = {
            "width": "100%"
        };

        if (config.type === WidgetType.Slider) {
            const cfg = (config as WidgetSlider);
            return (
                <Row>
                    <Col span={16}>
                        <Slider
                            value={cfg.value}
                            min={cfg.min}
                            max={cfg.max}
                            step={cfg.isInt ? 1 : 0.01}
                            onChange={this.onValueChange}
                        />
                    </Col>
                    <Col span={8}>
                        <InputNumber
                            className="wgtInputNum"
                            value={cfg.value}
                            min={cfg.min}
                            max={cfg.max}
                            step={cfg.isInt ? 1 : 0.01}
                            onChange={this.onValueChange}
                        />
                    </Col>
                </Row>
            )
        }
        else if (config.type === WidgetType.Vec3) {
            const cfg = (config as WidgetVec3);
            return (
                <Row gutter={3}>
                    <Col span={8}><InputNumber style={InputStyle} key="0" value={cfg.x} onChange={this.onValueChange.bind(this, 0)} /></Col>
                    <Col span={8}><InputNumber style={InputStyle} key="1" value={cfg.y} onChange={this.onValueChange.bind(this, 1)} /></Col>
                    <Col span={8}><InputNumber style={InputStyle} key="2" value={cfg.z} onChange={this.onValueChange.bind(this, 2)} /></Col>
                </Row>
            )
        }
        else if (config.type === WidgetType.Vec4) {
            const cfg = (config as WidgetVec4);
            return (
                <Row gutter={3}>
                    <Col span={6}><InputNumber style={InputStyle} key="0" value={cfg.x} onChange={this.onValueChange.bind(this, 0)} /></Col>
                    <Col span={6}><InputNumber style={InputStyle} key="1" value={cfg.y} onChange={this.onValueChange.bind(this, 1)} /></Col>
                    <Col span={6}><InputNumber style={InputStyle} key="2" value={cfg.z} onChange={this.onValueChange.bind(this, 2)} /></Col>
                    <Col span={6}><InputNumber style={InputStyle} key="2" value={cfg.w} onChange={this.onValueChange.bind(this, 3)} /></Col>
                </Row>
            )
        }
        else if (config.type === WidgetType.Switch) {
            return (
                <Switch defaultChecked={config.value} onChange={this.onValueChange} />
            )
        }
        else if (config.type === WidgetType.Radio) {
            const cfg = (config as WidgetRadio);
            return (
                <Radio.Group defaultValue={cfg.value} buttonStyle="solid" onChange={this.onValueChange}>
                    {cfg.options.map((x) => (
                        <Radio.Button value={x} key={x}>{x}</Radio.Button>
                    ))}
                </Radio.Group>
            )
        }
        else if(config.type === WidgetType.Color){
            const cfg = (config as WidgetColor);
            return (
                <Row>
                    <Popover
                        overlayClassName="wgtPop"
                        content = {(
                            <div>
                                <ChromePicker color={cfg.value} onChange={this.onValueChange}/>
                            </div>
                        )}
                        trigger="click"
                    >
                        <span className="wgtCol" style={{backgroundColor:cfg.value}} />
                    </Popover>
                </Row>
            );
        }
        return null;
    }


    public render() {
        const config = this.state.config;
        return (
            <Row className="wgtRow">
                <Col className="wgtLbl" span={8}>
                    {config.label}
                </Col>
                <Col className="wgtCnt" span={16}>
                    {this.getComp(config)}
                </Col>
            </Row>
        )
    }
}
