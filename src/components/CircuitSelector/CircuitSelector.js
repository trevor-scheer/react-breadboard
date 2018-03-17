import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from './ToggleButton';
import AndButton from './AndButton';
import OrButton from './OrButton';
import LedButton from './LedButton';

const CircuitSelector = props => (
  <div className="CircuitSelector">
    <ToggleButton />
    <AndButton />
    <OrButton />
    <LedButton />
  </div>
);

CircuitSelector.propTypes = {};

export default CircuitSelector;
