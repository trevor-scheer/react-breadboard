import React, {Component} from 'react';
import BreadboardProvider from './components/BreadboardProvider';
import Breadboard from './components/Breadboard';
import playground from './circuits/playground';

class App extends Component {
  render() {
    playground();
    return (
      <div className="App">
        <BreadboardProvider>
          <Breadboard />
        </BreadboardProvider>
      </div>
    );
  }
}

export default App;
