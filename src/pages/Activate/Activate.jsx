import React, { useState } from 'react';
import StepName from '../Steps/StepName/StepName';
import StepAvatar from '../Steps/StepAvatar/StepAvatar';
import Activating from '../Steps/StepActivating/Activating';

const steps = {
  1: StepName,
  2: StepAvatar,
  3: Activating,
};

const Activate = () => {
  const [step, setStep] = useState(1);
  const Component = steps[step];
  return <Component onNextClick={() => setStep((step) => step + 1)} />;
};

export default Activate;
