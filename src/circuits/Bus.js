import {INPUT, OUTPUT, UNUSED} from '../breadboard-utils';

export default class Bus {
  constructor({id, busSize}) {
    this.id = id;
    this.nodes = Object.seal(Array(busSize).fill({type: UNUSED}));
  }

  registerInput = ({index}) => {
    if (this.nodes[index].type !== UNUSED) {
      throw Error(
        `Attempted to register an input at an already occupied node at Bus(id: ${
          this.id
        }, index: ${index})`
      );
    }

    if (this.nodes.find(node => node.type === INPUT)) {
      throw Error(
        `Attempted to register an input with a Bus that already has an input at Bus(id: ${
          this.id
        }). A Bus can only have one input at a time.`
      );
    }
    this.nodes[index] = {type: INPUT};
    return this.updateOutputs;
  };

  registerOutput = ({index, fn}) => {
    if (this.nodes[index].type !== UNUSED) {
      throw Error(
        `Attempted to register an output at an already occupied node at Bus(id: ${
          this.id
        }, index: ${index})`
      );
    }

    if (typeof fn !== 'function') {
      throw TypeError(
        `Attempted to register an output without a valid callback function at Bus(id: ${
          this.id
        }, index: ${index}). Expected type function, instead received ${typeof fn}`
      );
    }
    this.nodes[index] = {type: OUTPUT, fn};
  };

  updateOutputs = value => {
    this.nodes.forEach(node => {
      if (node.type === OUTPUT) {
        node.fn(value);
      }
    });
  };
}
