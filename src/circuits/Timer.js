import Circuit from './Circuit';
import Toggle from './Toggle';

export default class Timer extends Toggle {
  constructor(initialState = false, interval = 500) {
    super(initialState);
    this.timerInterval = interval;
  }

  start() {
    this.interval = setInterval(this.toggle, this.timerInterval);
  }

  stop() {
    clearInterval(this.interval);
  }
}
