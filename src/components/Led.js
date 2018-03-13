import React, {Component} from 'react';
import Identity from '../circuits/Identity';

export default class Led extends Component {
  led = new Identity();
  state = {value: false};

  componentDidMount() {
    this.led.addSubscriber(value => {
      this.setState({value});
    });
    this.props.breadboard.addCircuit({
      circuit: this.led,
      inputs: [this.props.breadboard.circuits[0]]
    });
  }

  render() {
    return <div className="Led">{JSON.stringify(this.state.value)}</div>;
  }
}
