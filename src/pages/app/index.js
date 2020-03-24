import React, { useState } from 'react';
import { Welcome } from '../welcome';
import { Entrance } from '../entrance';
import { Input } from '../input';
import { Upload } from '../upload';
import { Steps } from '../../constants';

import './app.css';

export function App() {
  const [step, setStep] = useState(Steps.Upload);
  // const [todoList, setTodoList] = useState(null);
  const [todoList, setTodoList] = useState(['吃得多', '玩得多', '睡得多']);
  // const [userInfo, setUserInfo] = useState(null);
  const [userInfo, setUserInfo] = useState({
    nickname: '纸叠的世界',
    headimgurl: require('../../asset/images/temp.png'),
  });

  const moveForward = () => {
    setStep(step + 1);
  };

  const buildTodoListAndMoveForward = (data) => {
    setTodoList(data);
    moveForward();
  };

  const renderStep = () => {
    switch (step) {
      case Steps.Welcome:
        return <Welcome moveForward={moveForward} />;
      case Steps.Entrance:
        return <Entrance moveForward={moveForward} />;
      case Steps.Input:
        return <Input defaultTodoList={todoList} moveForward={buildTodoListAndMoveForward} />;
      case Steps.Upload:
        return <Upload todoList={todoList} userInfo={userInfo} moveForward={moveForward} />;
      default:
        return <Welcome moveForward={moveForward} />;
    }
  };

  return (
    <div>
      { renderStep() }
    </div>
  );
}
