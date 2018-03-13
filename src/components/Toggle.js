import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withBreadboard} from './BreadboardContext';
import ToggleCircuit from '../circuits/Toggle';

class Toggle extends Component {
  static propTypes = {
    outBusId: PropTypes.number.isRequired,
    outPinId: PropTypes.number.isRequired
  };

  state = {
    toggleState: false
  };

  toggle = new ToggleCircuit();

  componentDidMount() {
    this.toggle.addSubscriber(toggleState => {
      this.setState({toggleState});
    });
    this.props.breadboard.addCircuit({
      circuit: this.toggle,
      outputs: [{busId: this.props.outBusId, pinId: this.props.outPinId}]
    });
    console.warn({breadboard: this.props.breadboard});
  }

  handleClick = () => {
    this.toggle.toggle();
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Toggle: {this.state.toggleState ? 'true' : 'false'}
      </button>
    );
  }
}

export default withBreadboard(Toggle);
