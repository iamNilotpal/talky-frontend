import React, { useState } from 'react';

import StepAvatar from '../Steps/StepAvatar/StepAvatar';
import StepName from '../Steps/StepName/StepName';

const steps = Object.freeze({
  1: StepName,
  2: StepAvatar,
});

const Activate = () => {
  const [step, setStep] = useState(1);
  const Component = steps[step];
  return <Component onNextClick={() => setStep((step) => step + 1)} />;
};

export default Activate;
