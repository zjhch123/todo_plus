import React, { useState } from 'react';
import { Welcome } from '../welcome';
import { Entrance } from '../entrance';
import { Input } from '../input';
import { Steps } from '../../constants';

import './app.css';

export function App() {
  const [step, setStep] = useState(Steps.Welcome);
  const [todoList, setTodoList] = useState(null);

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
