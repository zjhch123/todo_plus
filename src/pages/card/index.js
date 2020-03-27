import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { useAPI } from '../../hooks/use-api';
import { postTodo } from '../../api';
import { renderError } from '../../components/floating-banner';
import { UserCard } from '../../components/user-card';
import { Button } from '../../components/button';
import { Loading } from '../../components/loading';
import { CardMode, ServerURL } from '../../constants';
import { compressImage } from '../../utils/compress-image';

import './index.scss';

export function Card({
  todoInfo,
  userInfo,
  cardInfo,
  onSaveButtonClick,
  onBackButtonClick,
  mode,
}) {
  const cardUserInfo = mode === CardMode.Share ? cardInfo.userInfo : userInfo;
  const cardTodoInfo = mode === CardMode.Share ? cardInfo.todoInfo : todoInfo;
  
  const [image, setImage] = useState(cardTodoInfo.image);
  const [showShareMask, setShowShareMask] = useState(false);
  const [, execute, isLoading] = useAPI(postTodo);

  const onImageUpload = async (e) => {
    const file = e.target.files[0];

    const blob = await compressImage(file);

    setImage({
      file: blob,
      url: URL.createObjectURL(blob),
    });
  };

  const onSaveButtonClickHandler = () => {
    const formData = new FormData();
    formData.append('list', JSON.stringify(todoInfo.list));
    formData.append('createdAt', todoInfo.createdAt);
    formData.append('image', image.file);
    execute(formData).then(({ code }) => {
      if (code === 200) {
        onSaveButtonClick(image);
      } else {
        renderError('保存失败, 可能是服务器开小差了..');
      }
    });
  };

  const cardImage = image.url ? image.url : require('../../asset/images/bitmap.png');

  return (
    <div className='p-upload'>
      <Loading show={isLoading === true} />
      {
        showShareMask && (
          <div className="u-share" onClick={() => setShowShareMask(false)}>
            <img src={require('../../asset/images/sharetip.png')} alt="share" />
          </div>
        )
      }
      <div className="u-bg">
        <img src={cardImage} alt="upload_bg" />
      </div>
      <div className="m-card">
        <UserCard
          imageURL={cardImage}
          userInfo={cardUserInfo}
          onImageUpload={onImageUpload}
          todoInfo={cardTodoInfo}
          canUpload={mode === CardMode.Edit}
          showVisitCount={mode === CardMode.Share}
        />
      </div>
      <div className="m-row">
        {
          mode !== CardMode.Share && (<Button className="u-btn" onClick={() => onBackButtonClick(image)}>修改</Button>)
        }
        {
          mode === CardMode.Edit && (<Button className="u-btn" onClick={onSaveButtonClickHandler}>完成</Button>)
        }
        {
          mode === CardMode.Show && (<Button className="u-btn" onClick={() => setShowShareMask(true)}>分享</Button>)
        }
        {
          mode === CardMode.Share && (<Button className="u-btn f-large" onClick={() => { window.location.href = ServerURL; }}>我也想填写赌约</Button>)
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
  }),
  userInfo: PropTypes.object,
  cardInfo: PropTypes.shape({
    userInfo: PropTypes.shape({
      _id: PropTypes.string,
      nickname: PropTypes.string,
      headimgurl: PropTypes.string,
    }),
    todoInfo: PropTypes.shape({
      createdAt: PropTypes.number,
      image: PropTypes.shape({
        file: PropTypes.object,
        url: PropTypes.string,
      }),
      list: PropTypes.arrayOf(PropTypes.string),
      visitCount: PropTypes.number,
    }),
  }),
  onSaveButtonClick: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(_.values(CardMode)).isRequired,
};

Card.defaultProps = {
  cardInfo: null,
  userInfo: null,
  todoInfo: null,
};
