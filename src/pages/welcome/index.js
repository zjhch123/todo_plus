import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button } from '../../components/button';

import './index.scss';

export function Welcome({
  moveForward,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const goNextAfterGIFFinish = () => {
    setTimeout(() => {
      moveForward();
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
          <Button className="btn" onClick={() => setIsLoading(true)}>出发</Button>
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
};
