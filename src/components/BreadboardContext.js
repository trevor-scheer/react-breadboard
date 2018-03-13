import React, {createContext} from 'react';

const {Provider, Consumer} = createContext();

export const BreadboardProvider = Provider;
export const BreadboardConsumer = Consumer;

export const withBreadboard = Component => props => (
  <Consumer>
    {breadboard => <Component breadboard={breadboard} {...props} />}
  </Consumer>
);
