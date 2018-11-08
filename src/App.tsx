import * as React from 'react';
import './App.css';
import { SampleMenu } from './components/SampleMenu';

class App extends React.Component {
  public render() {
    const data = [
      {key:"AAA",path:"XXXX"},
      {key:"VVV",path:"XXXX"},
    ];
    return (
      <div className="App">
        <canvas className="AppCanvas"></canvas>
        <div className="AppMenu">
          <SampleMenu sampleEnter={data}/>
        </div>
      </div>
    );
  }
}
export default App;
