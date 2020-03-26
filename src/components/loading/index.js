import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export function Loading({
  show,
}) {
  return (
    <div className={classnames('c-loading', { 'f-show': show })}>
      <img src={require('../../asset/images/dotted.png')} className="big" alt="dot" />
      <img src={require('../../asset/images/dotted.png')} className="small" alt="dot" />
    </div>
  );
}

Loading.propTypes = {
  show: PropTypes.bool.isRequired,
};
