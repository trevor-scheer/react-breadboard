import React, {Component} from 'react';
import PropTypes from 'prop-types';

const PINHOLE_SIZE = 2;
const SIZE = 8;

class Led extends Component {
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

  render() {
    const {inputs: [input], inputValues: [value]} = this.props.circuit;

    return (
      <g>
        <rect
          x={input.x + (PINHOLE_SIZE - SIZE) / 2}
          y={input.y + (PINHOLE_SIZE - SIZE) / 2}
          width={SIZE}
          height={SIZE}
          fill={value ? 'green' : 'black'}
        />
      </g>
    );
  }
}

export default Led;
