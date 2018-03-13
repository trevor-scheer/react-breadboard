import AndGate from './AndGate';
import OrGate from './OrGate';
import Toggle from './Toggle';
import Timer from './Timer';
import Breadboard from './Breadboard';

export default function playground() {
  const bb = new Breadboard({busCount: 10, busSize: 5});

  //const [bus] = bb.buses;

  //const updater = bus.registerInput({index: 0});
  /*bus.registerOutput({
    index: 1,
    fn: val => {
      console.log('node1: ', val);
    }
  });

  updater(true);*/

  const and = new AndGate();
  const or = new OrGate();
  const toggle = new Toggle();
  const timer = new Timer();

  //console.warn(timer.update);
  //console.warn(toggle.update);
  /*
  * @param {Circuit} circuit
  * @param {{inputId: Number, busId: Number, pinId: Number}[]} inputs
  * @param {{busId: Number, pinId: Number}[]} outputs
*/
  and.addSubscriber(val => {
    console.log('and updated: ', val);
  });

  bb.addCircuit({
    circuit: and,
    inputs: [{inputId: 0, busId: 0, pinId: 0}, {inputId: 1, busId: 0, pinId: 1}]
  });

  bb.addCircuit({
    circuit: timer,
    outputs: [{busId: 0, pinId: 2}]
  });

  /*and.addSubscriber(val => {
    console.log(val);
  });*/

  timer.start();
  timer.stop();

  //timer.toggle();
  //toggle.toggle();

  //console.warn(bb.buses[0]);
  //console.warn(and);
}
