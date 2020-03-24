import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Button } from '../../components/button';

import './index.scss';

export function Upload({
  moveForward,
  todoList,
  userInfo,
}) {
  const [image, setImage] = useState(require('../../asset/images/bitmap.png'));

  return (
    <div className='p-upload'>
      <div className="u-bg">
        <img src={image} alt="upload_bg" />
      </div>
      <div className="m-card">
        <div className="m-upload">
          <img className="u-upload-bg" src={image} alt="upload" />
          <Button className="u-upload-trigger">
            <img src={require('../../asset/images/upload.png')} className="trigger" alt="trigger" />
            <span className="content">上传图片</span>
          </Button>
          <input type="file" className="u-upload-control"></input>
        </div>
        <div className="m-user-info">

        </div>
        <div className="m-row">
          <Button className="u-submit">完成</Button>
        </div>
      </div>
    </div>
  );
}

Upload.propTypes = {
  moveForward: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.string).isRequired,
  userInfo: PropTypes.object.isRequired,
};
