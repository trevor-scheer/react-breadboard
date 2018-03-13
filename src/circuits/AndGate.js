import Circuit from './Circuit';

export default class AndGate extends Circuit {
  constructor() {
    super((inp1, inp2) => inp1 && inp2);
  }
}
