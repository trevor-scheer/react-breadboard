import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {selectCircuit} from '../../actions';
import {circuitTypes} from '../../constants';

import {withBreadboard} from '../BreadboardContext';
import IdentityCircuit from '../../circuits/Identity';
import LedComponent from '../Led';

class LedButton extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedCircuit === circuitTypes.LED &&
      nextProps.selectedPins.length === 1
    ) {
      const identity = new IdentityCircuit({type: circuitTypes.LED});
      this.props.breadboard.addCircuit({
        circuit: identity,
        inputs: nextProps.selectedPins.map((input, index) => ({
          ...input,
          inputId: index
        })),
        component: <LedComponent circuit={identity} key={identity.id} />
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
