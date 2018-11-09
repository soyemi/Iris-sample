import * as React from 'react';
import './App.css';
import { SampleMenu } from './components/SampleMenu';
import { SampleRunner } from './samples/SampleProgram';

class App extends React.Component {
  private canvas: React.RefObject<HTMLCanvasElement>;
  private static sampleRunner: SampleRunner;
  public constructor(prop) {
    super(prop);
    this.canvas = React.createRef();
  }

  public render() {
    let data = [];
    const samples = SampleRunner.Samples;
    for (const name in samples) {
      if (samples.hasOwnProperty(name)) {
        data.push({ key: name, path: name })
      }
    }
    return (
      <div className="App">
        <div className="AppMenu">
          <h2 className="AppTitle">Iris-samples</h2>
          <SampleMenu sampleEnter={data} onMenuItemClick={this.onSampleClick} />
        </div>
        <canvas ref={this.canvas} className="AppCanvas"></canvas>
      </div>
    );
  }

  public onSampleClick = (sname:string)=>{
    App.sampleRunner.LoadSample(sname).then((suc)=>{
      if(suc){
        history.pushState(null,`Iris-sample | ${sname}`,`${sname}`);
      }
    })
  }

  public componentDidMount() {
    if (App.sampleRunner == null) {
      let domcanvas = this.canvas.current;
      if (domcanvas != null) {
        let samplerunner = new SampleRunner(domcanvas);
        App.sampleRunner = samplerunner;

        let pathname= window.location.pathname.substr(1);
        samplerunner.LoadInitSample(pathname);
      }
    }

  }


}
export default App;

