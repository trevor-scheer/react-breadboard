import React, {PureComponent} from 'react';
import throttle from 'lodash.throttle';
import {withBreadboard} from './BreadboardContext';
import BreadboardSvg from './BreadboardSvg';

import ToggleCircuit from '../circuits/Toggle';

import Circuit from './Circuit';

// sq. unit in px
const UNIT = 20;
const HEIGHT = UNIT * 15;
const WIDTH = UNIT * 30;

const getPx = value => `${value}px`;

const styles = {
  position: 'relative',
  width: '90%',
  margin: '0 auto'
};

class Breadboard extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.unsubscribe = this.props.breadboard.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.unsubscribe();
  }

  handleResize = throttle(() => {
    const {top, left} = this.node.getBoundingClientRect();
    this.yOffset = top;
    this.xOffset = left;
  }, 300);

  handleClick = e => {
    this.getNearestRow(e.clientY);
    this.getNearestColumn(e.clientX);
  };

  getNearestRow = yVal => {
    const relativeY = yVal - this.yOffset;
    return Math.round(relativeY / UNIT);
  };

  getNearestColumn = xVal => {
    const relativeX = xVal - this.xOffset;
    return Math.round(relativeX / UNIT);
  };

  handlePinClick = ({busId, pinId, x, y}) => {
    console.log(busId, pinId, x, y);

    this.props.breadboard.addCircuit({
      circuit: new ToggleCircuit(),
      outputs: [{busId, pinId, x, y}]
    });
  };

  render() {
    const {breadboard} = this.props;

    return (
      <div className="Breadboard" style={styles} onClick={this.handleClick}>
        <BreadboardSvg
          getRef={ref => {
            this.node = ref;
          }}
          unit={UNIT}
          busCount={breadboard.busCount}
          busSize={breadboard.busSize}
          onPinClick={this.handlePinClick}
        >
          {Object.values(breadboard.circuits).map(circuit => (
            <Circuit circuit={circuit} key={circuit.id} />
          ))}
        </BreadboardSvg>
      </div>
    );
  }
}

export default withBreadboard(Breadboard);
