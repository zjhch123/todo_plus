import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import { UserCard } from '../../components/user-card';
import { Button } from '../../components/button';
import { CardMode } from '../../constants';

import './index.scss';

export function Card({
  todoInfo,
  userInfo,
  onSaveButtonClick,
  onBackButtonClick,
  mode,
}) {
  const [image, setImage] = useState(todoInfo.image);
  const [showShareMask, setShowShareMask] = useState(false);

  const onImageUpload = (e) => {
    const file = e.target.files[0];

    setImage({
      file,
      url: URL.createObjectURL(file),
    });
  };

  return (
    <div className='p-upload'>
      {
        showShareMask && (
          <div className="u-share" onClick={() => setShowShareMask(false)}>
            <img src={require('../../asset/images/sharetip.png')} alt="share" />
          </div>
        )
      }
      <div className="u-bg">
        <img src={image.url} alt="upload_bg" />
      </div>
      <div className="m-card">
        <UserCard
          imageURL={image.url}
          userInfo={userInfo}
          onImageUpload={onImageUpload}
          todoInfo={todoInfo}
          canUpload={mode === CardMode.Edit}
          showVisitCount={mode === CardMode.Share}
        />
      </div>
      <div className="m-row">
        {
          mode !== CardMode.Share && (<Button className="u-btn" onClick={() => onBackButtonClick(image)}>修改</Button>)
        }
        {
          mode === CardMode.Edit && (<Button className="u-btn" onClick={() => onSaveButtonClick(image)}>完成</Button>)
        }
        {
          mode === CardMode.Show && (<Button className="u-btn" onClick={() => setShowShareMask(true)}>分享</Button>)
        }
      </div>
    </div>
  );
}

Card.propTypes = {
  todoInfo: PropTypes.shape({
    image: PropTypes.shape({
      file: PropTypes.object,
      url: PropTypes.string,
    }),
    createdAt: PropTypes.number,
    list: PropTypes.arrayOf(PropTypes.string),
    visitCount: PropTypes.number,
  }).isRequired,
  userInfo: PropTypes.object.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(_.values(CardMode)).isRequired,
};
