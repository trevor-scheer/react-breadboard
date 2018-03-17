import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {selectCircuit} from '../../actions';
import {circuitTypes} from '../../constants';

import {withBreadboard} from '../BreadboardContext';
import ToggleCircuit from '../../circuits/Toggle';

class ToggleButton extends Component {
  componentWillReceiveProps(nextProps) {
    console.warn(nextProps);
    if (
      nextProps.selectedCircuit === circuitTypes.TOGGLE &&
      nextProps.selectedPins.length === 1
    ) {
      this.props.breadboard.addCircuit({
        circuit: new ToggleCircuit(),
        outputs: nextProps.selectedPins
      });
    }
  }

  handleClick = () => {
    this.props.selectCircuit({circuit: circuitTypes.TOGGLE});
  };

  render() {
    console.warn(this.props);
    return <button onClick={this.handleClick}>Toggle</button>;
  }
}

ToggleButton.propTypes = {};

const connected = connect(
  state => ({
    selectedCircuit: state.selectedCircuit,
    selectedPins: state.selectedPins
  }),
  {selectCircuit}
);

export default compose(connected, withBreadboard)(ToggleButton);
