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
    const data = [
      {key:"AAA",path:"XXXX"},
      {key:"VVV",path:"XXXX"},
    ];
    return (
      <div className="App">
        <canvas ref={this.canvas} className="AppCanvas"></canvas>
        <div className="AppMenu">
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
