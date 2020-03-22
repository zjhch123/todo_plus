import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export function Slider({
  className,
  interval,
  resources,
  loop,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!loop && currentIndex + 1 === resources.length) { return; }
      setCurrentIndex((currentIndex + 1) % resources.length);
    }, interval);

    return () => clearTimeout(timeoutId);
  }, [currentIndex, interval, resources, loop]);

  return (
    <div className={classnames('c-android-media', className)}>
      {
        resources.map((resource, index) => (
          <img
            key={resource}
            src={resource}
            alt={`android_${index}`}
            className={classnames(`resource-${index}`, {
              'f-show': currentIndex === index,
              'f-prev': currentIndex - 1 === index || (currentIndex === 0 && index === resources.length - 1),
            })}
            style={{
              animationDuration: `${(interval / 1000).toFixed(1)}s`,
            }}
          />
        ))
      }
    </div>
  );
}

Slider.propTypes = {
  className: PropTypes.string,
  interval: PropTypes.number,
  resources: PropTypes.array,
  loop: PropTypes.bool,
};

Slider.defaultProps = {
  className: '',
  interval: 5000,
  resources: [],
  loop: false,
};
