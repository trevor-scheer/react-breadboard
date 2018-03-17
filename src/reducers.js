import {combineReducers} from 'redux';
import {SELECT_CIRCUIT, SELECT_PIN, CIRCUIT_ADDED} from './actions';

const reducers = combineReducers({
  selectedCircuit(state = null, {type, payload}) {
    switch (type) {
      case SELECT_CIRCUIT:
        return payload.circuit;
      case CIRCUIT_ADDED:
        return null;
      default:
        return state;
    }
  },
  selectedPins(state = [], {type, payload}) {
    switch (type) {
      case CIRCUIT_ADDED:
      case SELECT_CIRCUIT:
        return [];
      case SELECT_PIN:
        return [...state, payload.pin];
      default:
        return state;
    }
  }
});

export default reducers;
