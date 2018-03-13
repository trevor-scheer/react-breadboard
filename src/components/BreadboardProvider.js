import React, {Component} from 'react';
import {BreadboardProvider as Provider} from './BreadboardContext';
import Breadboard from '../circuits/Breadboard';

export default class BreadboardProvider extends Component {
  breadboard = new Breadboard({busCount: 40, busSize: 5});

  render() {
    return <Provider value={this.breadboard}>{this.props.children}</Provider>;
  }
}
