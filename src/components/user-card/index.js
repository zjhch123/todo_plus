import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'underscore';

import { Button } from '../button';
import { dateFormat } from '../../utils/date-format';

import './index.scss';

export function UserCard({
  className,
  imageURL,
  userInfo,
  todoInfo,
  canUpload,
  onImageUpload,
  showVisitCount,
}) {
  const {
    list: todoList,
    createdAt,
    visitCount,
  } = todoInfo;

  const inputElement = useRef(null);
  const triggerUpload = () => inputElement && inputElement.current.click();
  const todoCount = _.filter(todoList, (item) => item.trim().length > 0).length;

  return (
    <div className={classnames('c-card', className)}>
      <div className="m-upload">
        <img className="u-upload-bg" src={imageURL} alt="upload" />
        {
          canUpload && (
            <>
              <Button className="u-upload-trigger" onClick={triggerUpload}>
                <img src={require('../../asset/images/upload.png')} className="trigger" alt="trigger" />
                <span className="content">上传图片</span>
              </Button>
              <input
                type="file"
                className="u-upload-control"
                accept="image/*"
                ref={inputElement}
                onChange={onImageUpload}
              />
            </>
          )
        }
      </div>
      <div className="m-user-info">
        <p className="u-title">
          <span className="english-bold">2020&nbsp;</span>
          年我要做
          <span className="english-bold">&nbsp;{todoCount}&nbsp;</span>
          个新尝试
        </p>
        <div className="u-todo">
          {
            todoList.map((content, index) => <p key={index}>{content}</p>)
          }
        </div>
        <div className="u-info">
          <img src={userInfo.headimgurl} alt="avatar" />
          <div>
            <p className="nickname">{userInfo.nickname}</p>
            <p className="time english">{dateFormat(createdAt)}</p>
          </div>
          {
            showVisitCount && (
              <div className="visit-count">
                <p className="english">{visitCount}</p>
                <p>人看过</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  className: PropTypes.string,
  imageURL: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired,
  todoInfo: PropTypes.shape({
    image: PropTypes.shape({
      file: PropTypes.object,
      url: PropTypes.string,
    }),
    createdAt: PropTypes.number,
    list: PropTypes.arrayOf(PropTypes.string),
    visitCount: PropTypes.number,
  }).isRequired,
  canUpload: PropTypes.bool,
  onImageUpload: PropTypes.func,
  showVisitCount: PropTypes.bool,
};

UserCard.defaultProps = {
  className: '',
  canUpload: false,
  showVisitCount: false,
  onImageUpload: _.noop,
};
