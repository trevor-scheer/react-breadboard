let id = 0;

export default class Circuit {
  constructor(resolver) {
    this.subscribers = [];
    this.outputs = [];
    this.inputs = Array(resolver.length).fill(false);
    this.subscriptions = this.inputs.map((_, index) => newVal => {
      this.inputs[index] = newVal;
      this.update();
    });
    this.resolver = resolver;
    this.id = Circuit.getId();
  }

  static getId() {
    return id++;
  }

  subscribeInput = ({index, x, y}) => {
    return this.subscriptions[index];
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
      subscriber(this.resolver(...this.inputs));
    });
  }
}
