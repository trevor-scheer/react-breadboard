import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {selectCircuit} from '../../actions';
import {circuitTypes} from '../../constants';

import {withBreadboard} from '../BreadboardContext';
import OrCircuit from '../../circuits/OrGate';

class OrButton extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedCircuit === circuitTypes.OR &&
      nextProps.selectedPins.length === 3
    ) {
      this.props.breadboard.addCircuit({
        circuit: new OrCircuit(),
        inputs: nextProps.selectedPins
          .slice(0, 2)
          .map((input, index) => ({...input, inputId: index})),
        outputs: [nextProps.selectedPins[2]]
      });
    }
  }

  handleClick = () => {
    this.props.selectCircuit({circuit: circuitTypes.OR});
  };

  render() {
    return <button onClick={this.handleClick}>Or</button>;
  }
}

const connected = connect(
  state => ({
    selectedCircuit: state.selectedCircuit,
    selectedPins: state.selectedPins
  }),
  {selectCircuit}
);

export default compose(connected, withBreadboard)(OrButton);
