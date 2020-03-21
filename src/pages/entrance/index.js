import React from 'react';
import PropTypes from 'prop-types';
import { MediaController } from '../../components/media-controller';

import './index.scss';

export function Entrance({
  moveForward,
}) {
  return (
    <div className="p-entrance">
      <div className="u-filter" />
      <MediaController className="u-media-controller" />
    </div>
  );
}

Entrance.propTypes = {
  moveForward: PropTypes.func.isRequired,
};
