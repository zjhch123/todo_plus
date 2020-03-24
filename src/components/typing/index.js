import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import _ from 'underscore';

import './index.scss';

export function Typing({
  fontSize,
  className,
  contents,
  config,
  loop,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (contents.length === 0) { return _.noop; }
    setContent(contents[currentIndex]);

    const timeoutId = setTimeout(() => {
      if (!loop && currentIndex + 1 === contents.length) {
        return;
      }
      
      setCurrentIndex((currentIndex + 1) % contents.length);
    }, (config.fadeIn + config.selected + config.display));

    return () => clearTimeout(timeoutId);
  }, [currentIndex, config, contents, loop]);

  const contentWidth = content ? content.length * fontSize : 0;
  const fadeInTimeout = (config.fadeIn / 1000).toFixed(1);
  const selectedDelayTimeout = ((config.fadeIn + config.display) / 1000).toFixed(1);

  const renderContent = () => (
    <span
      style={{
        animationDuration: `${fadeInTimeout}s`,
        animationTimingFunction: `steps(${content.length}, end)`,
      }}
      className="word"
    >
      {content}
    </span>
  );

  const renderCaret = () => (
    <i
      style={{
        animationDuration: `${fadeInTimeout}s, 1s`,
        animationTimingFunction: `steps(${content.length}, end), linear`,
      }}
    className="caret" />
  );

  return content ? (
    <div className={classnames('c-typing', className)}>
      <div
        className="content"
        key={currentIndex}
        style={{
          fontSize: `${fontSize}rem`,
          width: `${contentWidth}rem`,
          animationDelay: `${selectedDelayTimeout}s`,
        }}
      >
        {renderContent()}
        {renderCaret()}
      </div>
    </div>
  ) : null;
}

Typing.propTypes = {
  fontSize: PropTypes.number,
  className: PropTypes.string,
  contents: PropTypes.arrayOf(PropTypes.string),
  config: PropTypes.shape({
    fadeIn: PropTypes.number,
    display: PropTypes.number,
    selected: PropTypes.number,
  }),
  loop: PropTypes.bool,
};

Typing.defaultProps = {
  fontSize: 0.6,
  className: '',
  contents: [],
  config: {
    fadeIn: 1000,
    display: 3000,
    selected: 1000,
  },
  loop: false,
};
