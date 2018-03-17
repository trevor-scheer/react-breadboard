import Circuit from './Circuit';
import {circuitTypes} from '../constants';

export default class Toggle extends Circuit {
  constructor(initialState = false) {
    super({resolver: () => this.state, type: circuitTypes.TOGGLE});
    this.state = initialState;
  }

  toggle = () => {
    this.state = !this.state;
    this.update();
  };
}
