import * as React from 'react';
import './App.css';
import '../node_modules/react-wgtui/dist/index.css';
import {SampleRunner} from './samples/SampleProgram';
import {WgtButton, WgtFormContainer, WgtFieldInput, WgtFormItem, WgtPanel, WgtListView} from 'react-wgtui';

class App extends React.Component {
  private canvas : React.RefObject < HTMLCanvasElement >;
  private static sampleRunner : SampleRunner;
  public constructor(prop) {
    super(prop);
    this.canvas = React.createRef();
    document.title = "Iris samples"
  }

  public render() {
    this.testwgt();
    return this.rendermain();
  }

  private onListItemSel = (index:number)=>{

  }

  private rendermain() {
    let data = [];
    const samples = SampleRunner.Samples;
    for (const name in samples) {
      if (samples.hasOwnProperty(name)) {
        data.push({key: name, path: name})
      }
    }
    return (
      <div className="App">
        <div className="AppMenu">

          {/* <h2 className="AppTitle">Iris-samples</h2>
          <WgtButton label="xxx"></WgtButton>
          <SampleMenu sampleEnter={data} onMenuItemClick={this.onSampleClick}/> */}
          <WgtPanel title="Iris-Sample">
            <WgtListView 
              data={data} 
              onRenderItem={(item)=>(
                <div>{item.key}</div>
              )}
              onListItemSel={this.onListItemSel}
            />
          </WgtPanel>

        </div>
        <div className="AppMain">
          <canvas ref={this.canvas} className="AppCanvas"></canvas>
          <div className="AppLoading">

          </div>
        </div>
      </div>
    );
  }

  public testwgt() {
    return (
      <div>
        <WgtPanel>
          <WgtFormContainer>
            <WgtFormItem label="Name">
              <WgtFieldInput></WgtFieldInput>
              <WgtButton label="ok"></WgtButton>
              <WgtButton label="cancel"></WgtButton>
            </WgtFormItem>
          </WgtFormContainer>
        </WgtPanel>
      </div>
    )
  }

  public onSampleClick = (sname : string) => {
    App
      .sampleRunner
      .LoadSample(sname)
      .then((suc) => {
        if (suc) {
          history.pushState(null, `Iris-sample | ${sname}`, `${sname}`);
        }
      })
  }

  public componentDidMount() {
    if (App.sampleRunner == null) {
      let domcanvas = this.canvas.current;
      if (domcanvas != null) {
        let samplerunner = new SampleRunner(domcanvas);
        App.sampleRunner = samplerunner;

        let pathname = window
          .location
          .pathname
          .substr(1);
        samplerunner.LoadInitSample(pathname);
      }
    }

  }

}
export default App;
