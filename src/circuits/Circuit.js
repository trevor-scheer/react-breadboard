let id = 0;

export default class Circuit {
  constructor(resolver) {
    this.subscribers = [];
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

  subscribeInput = index => this.subscriptions[index];

  addSubscriber = newSub => {
    this.subscribers.push(newSub);
  };

  update() {
    this.subscribers.forEach(subscriber => {
      subscriber(this.resolver(...this.inputs));
    });
  }
}
