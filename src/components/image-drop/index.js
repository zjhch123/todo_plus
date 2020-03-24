import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export function ImageDrop({
  resources,
  className,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getTransform = (index) => {
    if (currentIndex === -1) {
      return `translateY(${-index * 50}%)`;
    }

    if (currentIndex === 0) {
      return index === 0 ? 'none' : `translateY(${-index * 50 + 50}%)`;
    } else {
      return index <= currentIndex 
        ? `translateY(${(1 - currentIndex - index) * 50}%)`
        : `translateY(${(1 - currentIndex - index + 1) * 50}%)`;
    }
  };

  return (
    <div className={classnames('c-image-drop', className)}>
      {
        resources.map(({ path, content }, index) => (
          <div
            className={classnames('item', { 'f-active': currentIndex === index })}
            key={path}
            style={{
              transform: getTransform(index),
            }}
            role="button"
            onClick={() => setCurrentIndex(currentIndex === index ? -1 : index)}
          >
            <img src={path} alt="image_drop_item" />
            <p dangerouslySetInnerHTML={{ __html: content }}></p>
          </div>
        ))
      }
    </div>
  );
}

ImageDrop.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    content: PropTypes.string,
  })),
  className: PropTypes.string,
};

ImageDrop.defaultProps = {
  resources: [],
  className: '',
};
