import Circuit from './Circuit';

export default class Identity extends Circuit {
  constructor() {
    super(input => input);
  }
}
