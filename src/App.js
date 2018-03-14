import React, {Component} from 'react';
import BreadboardProvider from './components/BreadboardProvider';
import Breadboard from './components/Breadboard';

class App extends Component {
  render() {
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
