import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MediaController } from '../../components/media-controller';

import './index.scss';
import { Typing } from '../../components/typing';
import { Slider } from '../../components/slider';
import { TodoContents, MediaElementId, IsAndroid } from '../../constants';
import { debounce } from '../../utils/debounce';


export function Entrance({
  moveForward,
}) {
  const [typingKey, setTypingKey] = useState(1);
  const updateTypingKey = debounce(() => setTypingKey(typingKey + 1));

  const renderAndroidSlider = () => (
    <Slider
      key={typingKey}
      className="u-slider"
      resources={[
        require('../../asset/images/a_1.png'),
        require('../../asset/images/a_2.png'),
        require('../../asset/images/a_3.png'),
        require('../../asset/images/a_4.png'),
      ]}
    />
  );

  useEffect(() => {
    const addTypingKey = (e) => {
      if (e.target.currentTime === 0) {
        updateTypingKey();
      }
    };
    
    const element = document.getElementById(MediaElementId);
    element.addEventListener('timeupdate', addTypingKey);

    return () => element.removeEventListener('timeupdate', addTypingKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingKey, updateTypingKey]);

  return (
    <div className="p-entrance">
      <div className="u-filter" />
      {
        IsAndroid && renderAndroidSlider()
      }
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
