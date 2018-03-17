import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {selectCircuit} from '../../actions';
import {circuitTypes} from '../../constants';

import {withBreadboard} from '../BreadboardContext';
import IdentityCircuit from '../../circuits/Identity';

class LedButton extends Component {
  componentWillReceiveProps(nextProps) {
    console.warn(nextProps);
    if (
      nextProps.selectedCircuit === circuitTypes.LED &&
      nextProps.selectedPins.length === 1
    ) {
      this.props.breadboard.addCircuit({
        circuit: new IdentityCircuit({type: circuitTypes.LED}),
        inputs: nextProps.selectedPins.map((input, index) => ({
          ...input,
          inputId: index
        }))
      });
    }
  }

  handleClick = () => {
    this.props.selectCircuit({circuit: circuitTypes.LED});
  };

  render() {
    return <button onClick={this.handleClick}>LED</button>;
  }
}

const connected = connect(
  state => ({
    selectedCircuit: state.selectedCircuit,
    selectedPins: state.selectedPins
  }),
  {selectCircuit}
);

export default compose(connected, withBreadboard)(LedButton);
