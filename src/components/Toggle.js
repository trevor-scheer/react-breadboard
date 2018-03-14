import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Toggle extends Component {
  static propTypes = {
    toggle: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.unsubscribe = this.props.toggle.addSubscriber({
      fn: () => {
        this.forceUpdate();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleClick = () => {
    this.props.toggle.toggle();
  };

  render() {
    return (
      <rect
        onClick={this.handleClick}
        x={this.props.toggle.outputs[0].x}
        y={this.props.toggle.outputs[0].y}
        width={8}
        height={8}
        fill="black"
      />
    );
  }
}

export default Toggle;
