import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export function Entrance({
  moveForward,
}) {
  return (
    <div className="p-entrance">
      <div className="u-filter" />
    </div>
  );
}

Entrance.propTypes = {
  moveForward: PropTypes.func.isRequired,
};
