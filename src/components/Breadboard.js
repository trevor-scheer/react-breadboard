import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withBreadboard} from './BreadboardContext';
import BreadboardSvg from './BreadboardSvg';

import ToggleCircuit from '../circuits/Toggle';

import Circuit from './Circuit';
import CircuitSelector from './CircuitSelector/CircuitSelector';
import {selectPin, circuitAdded} from '../actions';

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
    this.unsubscribe = this.props.breadboard.subscribe(() => {
      this.forceUpdate();
    });

    // Pass the circuitAdded action to the breadboard so it can
    // dispatch the action whenever a circuit is added
    this.unsubscribeRedux = this.props.breadboard.subscribe(
      this.props.circuitAdded
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribeRedux();
  }

  handlePinClick = ({busId, pinId, x, y}) => {
    this.props.selectPin({pin: {busId, pinId, x, y}});
  };

  render() {
    const {breadboard} = this.props;

    return (
      <div className="Breadboard" style={styles}>
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

        <CircuitSelector />
      </div>
    );
  }
}

const connected = connect(null, {selectPin, circuitAdded});

export default compose(connected, withBreadboard)(Breadboard);
