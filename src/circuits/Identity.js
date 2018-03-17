import Circuit from './Circuit';

export default class Identity extends Circuit {
  constructor({type}) {
    super({resolver: input => input, type});
  }
}
