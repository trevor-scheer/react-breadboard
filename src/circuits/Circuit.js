let id = 0;

export default class Circuit {
  constructor({resolver, type}) {
    this.subscribers = [];
    this.outputs = [];
    this.inputs = [];
    this.inputValues = Array(resolver.length).fill(false);
    this.subscriptions = this.inputValues.map((_, index) => newVal => {
      this.inputValues[index] = newVal;
      this.update();
    });
    this.resolver = resolver;
    this.type = type;
    this.id = Circuit.getId();
  }

  static getId() {
    return id++;
  }

  subscribeInput = ({inputId, x, y}) => {
    this.inputs.push({x, y});
    return this.subscriptions[inputId];
  };

  addSubscriber = ({fn, x, y}) => {
    // If no x && y, this is a view subscriber
    if (x && y) {
      this.outputs.push({x, y});
    }
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== newSub);
    };
  };

  update() {
    this.subscribers.forEach(subscriber => {
      subscriber(this.resolver(...this.inputValues));
    });
  }
}
