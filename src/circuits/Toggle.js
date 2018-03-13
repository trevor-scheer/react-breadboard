import Circuit from './Circuit';

export default class Toggle extends Circuit {
  constructor(initialState = false) {
    super(() => this.state);
    this.state = initialState;
  }

  toggle = () => {
    this.state = !this.state;
    this.update();
  };
}
