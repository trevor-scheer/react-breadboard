import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {selectCircuit} from '../../actions';
import {circuitTypes} from '../../constants';

import {withBreadboard} from '../BreadboardContext';
import ToggleCircuit from '../../circuits/Toggle';
import ToggleComponent from '../Toggle';

class ToggleButton extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedCircuit === circuitTypes.TOGGLE &&
      nextProps.selectedPins.length === 1
    ) {
      const toggle = new ToggleCircuit();
      this.props.breadboard.addCircuit({
        circuit: toggle,
        outputs: nextProps.selectedPins,
        component: <ToggleComponent circuit={toggle} key={toggle.id} />
      });
    }
  }

  handleClick = () => {
    this.props.selectCircuit({circuit: circuitTypes.TOGGLE});
  };

  render() {
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
