import React, {Component} from 'react';
import throttle from 'lodash.throttle';
import {withBreadboard} from './BreadboardContext';
import BreadboardSvg from './BreadboardSvg';
import Toggle from './Toggle';

// sq. unit in px
const UNIT = 20;
const HEIGHT = UNIT * 15;
const WIDTH = UNIT * 30;

const getPx = value => `${value}px`;

const styles = {
  position: 'relative',
  width: '90%',
  margin: '0 auto'
  //maxWidth: '1000px',
  //height: 'auto'
};

class Breadboard extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.unsubscribe = this.props.breadboard.subscribe(() => {
      console.warn('updated breadboard');
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
  /*
  handleDragOver = throttle((x, y) => {
    //console.warn(x, y);
    //console.warn(this.getNearestColumn(x), this.getNearestRow(y));
    this.setState({
      highlightX: this.getNearestColumn(x),
      highlightY: this.getNearestRow(y)
    });
  }, 100);

  handleDragEnter = () => {
    //console.warn('dragEnter');
    this.setState({showHighlight: true});
  };

  handleDragEnd = () => {
    this.setState({showHighlight: false});
  };*/
  /*
  * @param {Circuit} circuit
  * @param {{inputId: Number, busId: Number, pinId: Number}[]} inputs
  * @param {{busId: Number, pinId: Number}[]} outputs
*/
  state = {
    selectedBus: null,
    selectedPin: null
  };

  handlePinClick = ({busId, pinId}) => {
    console.log(busId, pinId);
    this.setState({selectedBus: busId, selectedPin: pinId});
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
        />
        {this.props.children}
        {this.state.selectedBus &&
          this.state.selectedPin && (
            <Toggle
              outPinId={this.state.selectedPin}
              outBusId={this.state.selectedBus}
            />
          )}
      </div>
    );
  }
}

export default withBreadboard(Breadboard);
