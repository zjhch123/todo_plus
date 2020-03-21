import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Button } from '../button';
import { MediaElementId } from '../../constants';

import './index.scss';

export function MediaController({
  className,
}) {
  const [isMuted, setIsMuted] = useState(false);
  const element = document.getElementById(MediaElementId);

  useEffect(() => {
    setIsMuted(element.muted);
  }, [element.muted]);

  const toggleMedia = () => {
    element.muted = !element.muted;
    setIsMuted(element.muted);
  };

  return (
    <Button
      className={classnames('c-media-controller', className, {
        'f-muted': isMuted,
      })}
      onClick={toggleMedia}>
      <img src={require('../../asset/images/music.png')} alt="media controller" />
    </Button>
  );
}

MediaController.propTypes = {
  className: PropTypes.string,
};

MediaController.defaultProps = {
  className: '',
};
