import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button } from '../../components/button';
import { MediaElementId, LoginURI } from '../../constants';

import './index.scss';

export function Welcome({
  moveForward,
  userInfo,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const playMedia = (pre = false) => {
    // #HACK
    document.getElementById(MediaElementId).classList.add('f-show');
    document.getElementById(MediaElementId).play();
    pre && document.getElementById(MediaElementId).pause();
  };

  const onClickHandler = () => {
    if (userInfo === null) {
      window.location.href = LoginURI;
      return;
    }
    setIsLoading(true);
    playMedia(true);
  };

  const goNextAfterGIFFinish = () => {
    setTimeout(() => {
      moveForward();
      playMedia();
    }, 3200);
  };

  return (
    <div className="p-welcome">
      <div className="m-container">
        <div className={classnames('u-title', { 'f-fadeOut': isLoading })}>
          <img
            className="img"
            src={require('../../asset/images/text.svg')}
            alt="welcome text"
          />
          <Button className="btn" onClick={onClickHandler}>出发</Button>
        </div>
        {
          isLoading && <img className="u-loading" src={require('../../asset/images/logo.gif')} alt="loading" onLoad={goNextAfterGIFFinish} />
        }
      </div>
    </div>
  );
}

Welcome.propTypes = {
  moveForward: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
};

Welcome.defaultProps = {
  userInfo: null,
};
