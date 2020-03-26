import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MediaController } from '../../components/media-controller';

import { Typing } from '../../components/typing';
import { Slider } from '../../components/slider';
import { Button } from '../../components/button';
import { TodoContents, MediaElementId, IsAndroid, AndroidSliderResources } from '../../constants';
import { debounce } from '../../utils/debounce';

import './index.scss';

export function Entrance({
  moveForward,
  moveToView,
  todoInfo,
}) {
  const [typingKey, setTypingKey] = useState(1);
  const updateTypingKey = debounce(() => setTypingKey(typingKey + 1));

  const renderAndroidSlider = () => (
    <Slider
      key={typingKey}
      className="u-slider"
      resources={AndroidSliderResources}
    />
  );

  const stopMedia = () => {
    const mediaElement = document.getElementById(MediaElementId);
    mediaElement.pause();
    mediaElement.currentTime = 0;
  };

  const goNext = () => {
    stopMedia();
    moveForward();
  };

  const goView = () => {
    stopMedia();
    moveToView();
  };

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
        <div className="u-title">我要</div>
        <div className="u-typing">
          <Typing
            key={typingKey}
            contents={TodoContents}
          />
        </div>
        {
          todoInfo.list === null ? (
            <Button
              className="u-btn"
              onClick={goNext}
            >
              填写我的&nbsp;<span className="english">2020</span>&nbsp;赌约
            </Button>
          ) : (
            <Button
              className="u-btn"
              onClick={goView}
            >
                查看我的赌约
            </Button>
          )
        }
      </div>
    </div>
  );
}

Entrance.propTypes = {
  moveForward: PropTypes.func.isRequired,
  moveToView: PropTypes.func.isRequired,
  todoInfo: PropTypes.shape({
    image: PropTypes.shape({
      file: PropTypes.object,
      url: PropTypes.string,
    }),
    createdAt: PropTypes.number,
    list: PropTypes.arrayOf(PropTypes.string),
    visitCount: PropTypes.number,
  }).isRequired,
};
