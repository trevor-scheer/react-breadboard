import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Toggle from './Toggle';

export default class Circuit extends Component {
  static propTypes = {
    circuit: PropTypes.object.isRequired
  };

  render() {
    return (() => {
      switch (this.props.circuit.constructor.name) {
        case 'Toggle':
          return <Toggle toggle={this.props.circuit} />;
        default:
          return <p>No circuit found</p>;
      }
    })();
  }
}
