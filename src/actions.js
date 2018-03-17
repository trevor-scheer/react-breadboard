const payloadAction = type => payload => ({type, payload});
const simpleAction = type => () => ({type});

export const SELECT_CIRCUIT = 'SELECT_CIRCUIT';
export const SELECT_PIN = 'SELECT_PIN';
export const CIRCUIT_ADDED = 'CIRCUIT_ADDED';

export const selectCircuit = payloadAction(SELECT_CIRCUIT);
export const selectPin = payloadAction(SELECT_PIN);
export const circuitAdded = simpleAction(CIRCUIT_ADDED);
