import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';
import { useTouch } from '../../hooks/use-touch';

export function Button({
  className,
  children,
  ...rest
}) {
  const buttonRef = useRef(null);
  const isTouch = useTouch(buttonRef);

  return (
    <button
      ref={buttonRef}
      className={classnames(className, 'c-btn', { 'f-touched': isTouch })}
      {...rest}
    >{children}</button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  className: '',
  children: '',
};
