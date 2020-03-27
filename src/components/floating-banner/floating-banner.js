import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'underscore';

import './index.scss';

export const Types = Object.freeze({
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
});

export function FloatingBanner({
  children,
  className,
  type,
}) {
  return (
    <div className={classnames('c-floating-banner', `f-${type}`, className)}>
      <span>{children}</span>
    </div>
  );
}

FloatingBanner.propTypes = {
  type: PropTypes.oneOf(_.values(Types)).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

FloatingBanner.defaultProps = {
  className: '',
};
