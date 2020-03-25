import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'underscore';
import { useElementHeight } from '../../hooks/use-element-height';
import { useCountDown } from '../../hooks/use-count-down';
import { ImageDrop } from '../../components/image-drop';
import { Button } from '../../components/button';

import { ImageDropResources } from '../../constants';

import './index.scss';

export function Input({
  moveForward,
  defaultTodoList,
}) {
  const [stage, setStage] = useState(1);
  const [introElementRef, , getIntroElementHeight] = useElementHeight();
  const [focusInputIndex, setFocusInputIndex] = useState(-1);
  const [todoList, setTodoList] = useState(defaultTodoList === null ? ['', '', ''] : defaultTodoList);
  const [displaySubmit, setDisplaySubmit] = useState(false);
  const countDown = useCountDown(new Date(2020, 0, 1).getTime());

  const todoCount = _.filter(todoList, (item) => item.trim().length > 0).length;

  const goToStage2 = () => setStage(2);

  const inputTodoList = (e) => {
    const immutableTodoList = todoList.slice(0);
    immutableTodoList[e.target.dataset.index] = e.target.value;
    setTodoList(immutableTodoList);
  };

  const renderInput = (val, index) => (
    <div className={classnames('input', { 'f-focus': focusInputIndex === index })} key={index}>
      <input
        type="text"
        data-index={index}
        onChange={inputTodoList}
        value={val}
        onFocus={() => setFocusInputIndex(index)}
        onBlur={() => setFocusInputIndex(-1)}
      />
    </div>
  );

  useEffect(() => {
    setDisplaySubmit(stage === 2 && _.some(todoList, (item) => item.length > 0));
  }, [todoList, stage]);

  useLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      if (_.some(todoList, (item) => item.trim().length > 0)) {
        setStage(2);
      }
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [todoList]);

  return (
    <div className="p-input">
      <div className="m-slider" style={{
        transform: stage === 2 ? `translateY(-${getIntroElementHeight()}px)` : 'none',
      }}>
        <div className={classnames('m-intro', { 'f-hide': stage === 2 })} ref={introElementRef}>
          <div className="m-content">
            <p>&nbsp;</p>
            <p>你好，</p>
            <p className="color-green">纸叠的世界</p>
            <p><span className="english-bold color-green">2020&nbsp;</span>年已经过去了</p>
            <p><span className="roboto-bold color-green">{parseInt(countDown / 1000).toLocaleString('en-us')}&nbsp;</span>秒</p>
            <p>我们终于等来第<span className="english-bold color-green">&nbsp;1&nbsp;</span>位和我们打赌的人</p>
          </div>
        </div>
        <div className="m-input">
          <div
            className={classnames('u-section', {
              'f-stage1': stage === 1,
              'f-stage2': stage === 2,
            })}>
            <Button className="intro f-stage1-intro" onClick={goToStage2} role="button">点击填写赌约</Button>
            <span className="intro f-stage2-intro">
              <span className="english-bold">2020&nbsp;</span>
              年我要做
              <span className="english-bold">
                &nbsp;{todoCount === 0 ? 'n' : todoCount}&nbsp;
              </span>
              个新尝试</span>
            <div className="input-list">
              {
                todoList.map(renderInput)
              }
            </div>
          </div>
        </div>
        <div className={classnames('m-row', { 'f-show': displaySubmit })}>
          <Button onClick={() => displaySubmit && moveForward(todoList)} className="u-submit">确认</Button>
        </div>
      </div>
      <div className={classnames('u-image-drop', { 'f-show': stage === 2, 'f-move-down': displaySubmit })}>
        <ImageDrop
          resources={ImageDropResources}
        />
      </div>
    </div>
  );
}

Input.propTypes = {
  defaultTodoList: PropTypes.arrayOf(PropTypes.string),
  moveForward: PropTypes.func.isRequired,
};

Input.defaultProps = {
  defaultTodoList: null,
};
