import React, {Component} from 'react';
import BreadboardProvider from './components/BreadboardProvider';
import Breadboard from './components/Breadboard';
import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BreadboardProvider>
          <Provider store={store}>
            <Breadboard />
          </Provider>
        </BreadboardProvider>
      </div>
    );
  }
}

export default App;
