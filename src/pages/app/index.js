import React, { useState } from 'react';
import { Welcome } from '../welcome';

import './app.css';
import { Steps } from '../../constants';

export function App() {
  const [step, setStep] = useState(Steps.Welcome);

  const moveForward = () => {
    setStep(step + 1);
  };

  const renderStep = () => {
    switch (step) {
      case Steps.Welcome:
        return <Welcome moveForward={moveForward} />;
      case Steps.Index:
        return <div>123</div>;
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
