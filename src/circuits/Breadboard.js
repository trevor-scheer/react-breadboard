import Bus from './Bus';

export default class Breadboard {
  constructor({busCount = 20, busSize = 5}) {
    this.busCount = busCount;
    this.busSize = busSize;
    this.buses = [...Array(busCount)].map(
      (_, index) => new Bus({id: index, busSize})
    );
  }

  circuits = {};
  subscribers = [];

  subscribe(fn) {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }

  /**
   * Add a circuit to the breadboard with initial inputs and outputs
   *
   * @param {Circuit} circuit
   * @param {{inputId: Number, busId: Number, pinId: Number}[]} inputs into the circuit
   * @param {{busId: Number, pinId: Number}[]} outputs from the circuit
   */
  addCircuit({circuit, inputs = [], outputs = []}) {
    inputs.forEach(({inputId, busId, pinId}) => {
      const fn = circuit.subscribeInput(inputId);
      this.buses[busId].registerOutput({index: pinId, fn});
    });

    outputs.forEach(({busId, pinId}) => {
      const fn = this.buses[busId].registerInput({index: pinId});
      circuit.addSubscriber(fn);
    });

    this.circuits[circuit.id] = circuit;
  }
}
