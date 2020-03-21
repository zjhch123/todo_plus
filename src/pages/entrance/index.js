import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MediaController } from '../../components/media-controller';

import './index.scss';
import { Typing } from '../../components/typing';
import { TodoContents, MediaElementId } from '../../constants';

export function Entrance({
  moveForward,
}) {
  const [typingKey, setTypingKey] = useState(1);

  useEffect(() => {
    const addTypingKey = (e) => {
      if (e.target.currentTime === 0) {
        setTypingKey(typingKey + 1);
      }
    };
    
    const element = document.getElementById(MediaElementId);
    element.addEventListener('timeupdate', addTypingKey);

    return () => element.removeEventListener('timeupdate', addTypingKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingKey]);

  return (
    <div className="p-entrance">
      <div className="u-filter" />
      <div className="m-container">
        <MediaController className="u-media-controller" />
        <div className="u-typing">
          <Typing key={typingKey} contents={TodoContents} />
        </div>
      </div>
    </div>
  );
}

Entrance.propTypes = {
  moveForward: PropTypes.func.isRequired,
};
