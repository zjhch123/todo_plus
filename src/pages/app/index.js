import React, { useState } from 'react';
import { Welcome } from '../welcome';
import { Entrance } from '../entrance';
import { Input } from '../input';
import { Card } from '../card';
import { Steps, CardMode } from '../../constants';

import './app.css';

export function App() {
  const [step, setStep] = useState(Steps.Welcome);

  const [userInfo] = useState({
    openid: '123456',
    nickname: '纸叠的世界',
    headimgurl: require('../../asset/images/temp.png'),
  });

  const [todoInfo, setTodoInfo] = useState({
    createdAt: null,
    list: null,
    image: {
      file: null,
      url: require('../../asset/images/bitmap.png'),
    },
    visitCount: 0,
  });

  const [cardMode, setCardMode] = useState(CardMode.Edit);

  const moveForward = () => {
    setStep(step + 1);
  };

  const buildTodoListAndMoveForwardToCard = (data) => {
    setTodoInfo({
      ...todoInfo,
      createdAt: Date.now(),
      list: data,
    });
    moveForward();
  };

  const buildTodoListAndFinish = (data) => {
    setTodoInfo({
      ...todoInfo,
      image: data,
    });
    setCardMode(CardMode.Show);
  };

  const backToInput = () => {
    setStep(Steps.Input);
    setCardMode(CardMode.Edit);
  };

  const renderStep = () => {
    switch (step) {
      case Steps.Welcome:
        return <Welcome moveForward={moveForward} />;
      case Steps.Entrance:
        return <Entrance moveForward={moveForward} />;
      case Steps.Input:
        return <Input defaultTodoList={todoInfo.list} moveForward={buildTodoListAndMoveForwardToCard} />;
      case Steps.Card:
        return <Card
          todoInfo={todoInfo}
          userInfo={userInfo}
          onSaveButtonClick={buildTodoListAndFinish}
          onBackButtonClick={backToInput}
          mode={cardMode}
        />;
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
