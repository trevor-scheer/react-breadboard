import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {selectCircuit} from '../../actions';
import {circuitTypes} from '../../constants';

import {withBreadboard} from '../BreadboardContext';
import AndCircuit from '../../circuits/AndGate';
import AndComponent from '../And';

class AndButton extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedCircuit === circuitTypes.AND &&
      nextProps.selectedPins.length === 3
    ) {
      const andCircuit = new AndCircuit();
      this.props.breadboard.addCircuit({
        circuit: andCircuit,
        inputs: nextProps.selectedPins
          .slice(0, 2)
          .map((input, index) => ({...input, inputId: index})),
        outputs: [nextProps.selectedPins[2]],
        component: <AndComponent circuit={andCircuit} key={andCircuit.id} />
      });
    }
  }

  handleClick = () => {
    this.props.selectCircuit({circuit: circuitTypes.AND});
  };

  render() {
    return <button onClick={this.handleClick}>And</button>;
  }
}

AndButton.propTypes = {};

const connected = connect(
  state => ({
    selectedCircuit: state.selectedCircuit,
    selectedPins: state.selectedPins
  }),
  {selectCircuit}
);

export default compose(connected, withBreadboard)(AndButton);
