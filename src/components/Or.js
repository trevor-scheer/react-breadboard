import React, {Component} from 'react';
import PropTypes from 'prop-types';

const PINHOLE_SIZE = 2;

class Or extends Component {
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
    const {outputs, inputs} = this.props.circuit;
    return (
      <g>
        <line
          x1={inputs[0].x}
          y1={inputs[0].y}
          x2={inputs[1].x}
          y2={inputs[1].y}
          style={{stroke: 'black', strokeWidth: '2'}}
        />
        <line
          x1={inputs[0].x}
          y1={inputs[0].y}
          x2={outputs[0].x}
          y2={outputs[0].y}
          style={{stroke: 'black', strokeWidth: '2'}}
        />
        <line
          x1={inputs[1].x}
          y1={inputs[1].y}
          x2={outputs[0].x}
          y2={outputs[0].y}
          style={{stroke: 'black', strokeWidth: '2'}}
        />
      </g>
    );
  }
}

export default Or;
