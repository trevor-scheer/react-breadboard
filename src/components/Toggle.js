import React, {Component} from 'react';
import PropTypes from 'prop-types';

const PINHOLE_SIZE = 2;
const SIZE = 8;

class Toggle extends Component {
  static propTypes = {
    circuit: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.unsubscribe = this.props.circuit.addSubscriber({
      fn: () => {
        this.forceUpdate();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleClick = () => {
    this.props.circuit.toggle();
  };

  render() {
    return (
      <g onClick={this.handleClick}>
        <rect
          x={this.props.circuit.outputs[0].x + (PINHOLE_SIZE - SIZE) / 2}
          y={this.props.circuit.outputs[0].y + (PINHOLE_SIZE - SIZE) / 2}
          width={SIZE}
          height={SIZE}
          fill="black"
        />
        <rect
          x={this.props.circuit.outputs[0].x + (PINHOLE_SIZE - SIZE / 2) / 2}
          y={this.props.circuit.outputs[0].y + (PINHOLE_SIZE - SIZE / 2) / 2}
          width={SIZE / 2}
          height={SIZE / 2}
          fill={this.props.circuit.state ? 'green' : 'red'}
        />
      </g>
    );
  }
}

export default Toggle;
