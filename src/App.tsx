import * as React from 'react';
import './App.css';
import '../node_modules/react-wgtui/dist/index.css';
import { SampleRunner } from './samples/SampleProgram';
import { WgtPanel, WgtListView, WgtLoader } from 'react-wgtui';
import { WaitForTimes } from './samples/SampleResPack';
import { ConfigPanel, ConfigObj } from './ConfigPanel';

interface SampleData {
  key: string;
  path: string;
}

interface AppStates {
  onload: boolean;
}

class App extends React.Component<{}, AppStates>{
  private canvas: React.RefObject<HTMLCanvasElement>;
  private divLoading:React.RefObject<HTMLDivElement>;
  private static sampleRunner: SampleRunner;
  private samples: SampleData[] = [];
  private cfgpnl: React.RefObject<ConfigPanel>;

  public constructor(prop) {
    super(prop);
    this.canvas = React.createRef();
    this.divLoading = React.createRef();
    this.cfgpnl = React.createRef();
    this.state = {
      onload: true
    };
    document.title = "Iris samples";
    const samples = SampleRunner.Samples;
    for (const name in samples) {
      if (samples.hasOwnProperty(name)) {
        this.samples.push({ key: name, path: name })
      }
    }
  }

  public render() {
    return this.rendermain();
  }

  private async setLoadingView(show: boolean):Promise<void>{
    if(show == this.state.onload) return;
    let divloading = this.divLoading.current;
    if(show){
      divloading.style.display = "block";
      await WaitForTimes(100);
      divloading.style.opacity = '1.0';
      await WaitForTimes(1500);
    }
    else{
      divloading.style.opacity = '0';
      await WaitForTimes(1000);
      divloading.style.display = "none";
    }
    this.setState({
      onload: show
    });

  }

  private onListItemSel = async (index: number) => {
    const selSample = this.samples[index];
    let sname = selSample.key;

    const sampleRunner = App.sampleRunner;
    if (sampleRunner.cursname === sname) return;

    await this.setLoadingView(true);
    this.loadSample(sname);
  }

  private async loadSample(sname:string){
    var self = this;
    let [suc,cfgobj] =await App.sampleRunner.LoadSample(sname);
    if(suc){
      self.setLoadingView(false);
      this.onLoadSuccess(cfgobj);
      history.pushState(null, `Iris-sample | ${sname}`, `${sname}`);
    }
  }

  private async onLoadSuccess(cfgobj:ConfigObj){
    this.cfgpnl.current.setConfigObject(cfgobj);
  }

  private rendermain() {
    const data = this.samples;
    return (
      <div className="App">
        <div className="AppMenu">
          <WgtPanel title="Iris-Sample">
            <WgtListView
              selectable={true}
              data={data}
              onRenderItem={(item) => (
                <div>{item.key}</div>
              )}
              onListItemSel={this.onListItemSel.bind(this)}
            />
          </WgtPanel>
        </div>
        <div className="AppMain">
          <canvas ref={this.canvas} className="AppCanvas"></canvas>
          <div className="AppCfgPnl">
            <ConfigPanel ref={this.cfgpnl}></ConfigPanel>
          </div>
          <div ref={this.divLoading} className="AppLoading">
            <WgtLoader />
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    if (App.sampleRunner == null) {
      let domcanvas = this.canvas.current;
      if (domcanvas != null) {
        let samplerunner = new SampleRunner(domcanvas);
        App.sampleRunner = samplerunner;
        let pathname = window.location.pathname.substr(1);
        this.loadSample(pathname);
      }
    }
  }
}
export default App;
