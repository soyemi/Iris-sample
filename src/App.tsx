import * as React from 'react';
import './App.css';
import { SampleMenu } from './components/SampleMenu';
import {SampleRunner} from './samples/SampleProgram';



class App extends React.Component {

  private canvas:React.RefObject<HTMLCanvasElement>;

  private static sampleRunner:SampleRunner;

  public constructor(prop){
    super(prop);
    this.canvas= React.createRef();
  }

  public render() {
    let data = [];
    const samples = SampleRunner.Samples;
    for (const name in samples) {
      if (samples.hasOwnProperty(name)) {
        data.push({key:name,path:name})
      }
    }
    return (
      <div className="App">
        <canvas ref={this.canvas} className="AppCanvas"></canvas>
        <div className="AppMenu">
          <h2 className="AppTitle">Iris-samples</h2>
          <SampleMenu sampleEnter={data}/>
        </div>
      </div>
    );
  }

  public componentDidMount(){
    if(App.sampleRunner == null){
      let domcanvas = this.canvas.current;
      if(domcanvas != null){
        App.sampleRunner = new SampleRunner(domcanvas);
      }
    }

  }
  public componentWillUnmount(){

  }
}
export default App;
