import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {circuitTypes} from '../constants';
import Toggle from './Toggle';
import And from './And';
import Or from './Or';
import Led from './Led';

export default class Circuit extends Component {
  static propTypes = {
    circuit: PropTypes.object.isRequired
  };

  render() {
    return (() => {
      switch (this.props.circuit.type) {
        case circuitTypes.TOGGLE:
          return <Toggle circuit={this.props.circuit} />;
        case circuitTypes.AND:
          return <And circuit={this.props.circuit} />;
        case circuitTypes.OR:
          return <Or circuit={this.props.circuit} />;
        case circuitTypes.LED:
          return <Led circuit={this.props.circuit} />;
        default:
          return <p>No circuit found</p>;
      }
    })();
  }
}
