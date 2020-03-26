import React, { useState, useEffect } from 'react';
import { Welcome } from '../welcome';
import { Entrance } from '../entrance';
import { Input } from '../input';
import { Card } from '../card';
import { Steps, CardMode } from '../../constants';
import { Loading } from '../../components/loading';
import { useUserInfo } from '../../hooks/use-user-info';
import { useTodoInfo } from '../../hooks/use-todo-info';
import { useCardInfo } from '../../hooks/use-card-info';
import { useTodoCount } from '../../hooks/use-todo-count';

import './app.css';

export function App() {
  const [step, setStep] = useState(null);
  const [userInfo, isUserInfoLoading] = useUserInfo();
  const [todoInfo, setTodoInfo, isTodoInfoLoading] = useTodoInfo();
  const [cardInfo, isCardInfoLoading] = useCardInfo();
  const [todoCount] = useTodoCount();

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

  const backToInput = (data) => {
    setTodoInfo({
      ...todoInfo,
      image: data,
    });
    setStep(Steps.Input);
    setCardMode(CardMode.Edit);
  };

  const moveToView = () => {
    setCardMode(CardMode.Show);
    setStep(Steps.Card);
  };

  const renderStep = () => {
    switch (step) {
      case Steps.Welcome:
        return <Welcome moveForward={moveForward} userInfo={userInfo} todoInfo={todoInfo} />;
      case Steps.Entrance:
        return <Entrance moveForward={moveForward} todoInfo={todoInfo} moveToView={moveToView} />;
      case Steps.Input:
        return <Input todoCount={todoCount} userInfo={userInfo} defaultTodoList={todoInfo.list} moveForward={buildTodoListAndMoveForwardToCard} />;
      case Steps.Card:
        return <Card
          todoInfo={todoInfo}
          userInfo={userInfo}
          cardInfo={cardInfo}
          onSaveButtonClick={buildTodoListAndFinish}
          onBackButtonClick={backToInput}
          mode={cardMode}
        />;
      default:
        return;
    }
  };

  useEffect(() => {
    const id = new URL(document.location).searchParams.get('id');

    if (isUserInfoLoading === false && isTodoInfoLoading === false) {
      if (!id) {
        setStep(Steps.Welcome);
      } else if (isCardInfoLoading === false) {
        setCardMode(CardMode.Share);
        setStep(Steps.Card);
      }
    }
  }, [cardInfo, isUserInfoLoading, isTodoInfoLoading, isCardInfoLoading]);

  useEffect(() => {
    if (step !== Steps.Card) {
      window.wxShare.setShareData({
        title: '我们打个赌，一年为期',
        desc: '敢不敢来打赌',
        link: window.location.href,
      });
      return;
    }

    switch (cardMode) {
      case CardMode.Edit:
        window.wxShare.setShareData({
          title: '我们打个赌，一年为期',
          desc: '敢不敢来打赌',
          link: window.location.href,
        });
        break;
      case CardMode.Show:
      case CardMode.Share: {
        const { _id: id, nickname } = cardMode === CardMode.Show ? userInfo : cardInfo.userInfo;
        const origin = new URL(window.location.origin);
        origin.searchParams.append('id', id);

        window.wxShare.setShareData({
          title: `快来看看 ${nickname} 的赌约`,
          desc: '速看!',
          link: origin.toString(),
        });
        break;
      }
      default: return;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardMode, step]);

  return (
    <div>
      <Loading show={isTodoInfoLoading || isUserInfoLoading} />
      { renderStep() }
      <span className="english preload">1</span>
      <span className="english-bold preload">1</span>
      <span className="roboto-bold preload">1</span>
      <img src={require('../../asset/images/filter.png')} alt="preload" className="preload" />
      <img src={require('../../asset/images/bitmap.png')} alt="preload" className="preload" />
    </div>
  );
}
