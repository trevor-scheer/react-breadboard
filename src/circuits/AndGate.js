import Circuit from './Circuit';
import {circuitTypes} from '../constants';

export default class AndGate extends Circuit {
  constructor() {
    super({resolver: (inp1, inp2) => inp1 && inp2, type: circuitTypes.AND});
  }
}
