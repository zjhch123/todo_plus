import React, { useState } from 'react';
import { Welcome } from '../welcome';
import { Entrance } from '../entrance';
import { Steps } from '../../constants';

import './app.css';

export function App() {
  const [step, setStep] = useState(Steps.Welcome);

  const moveForward = () => {
    setStep(step + 1);
  };

  const renderStep = () => {
    switch (step) {
      case Steps.Welcome:
        return <Welcome moveForward={moveForward} />;
      case Steps.Entrance:
        return <Entrance moveForward={moveForward} />;
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
