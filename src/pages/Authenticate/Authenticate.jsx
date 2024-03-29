import React, { useState } from 'react';

import StepOtp from '../Steps/StepOtp/StepOtp';
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail';

const steps = Object.freeze({
  1: StepPhoneEmail,
  2: StepOtp,
});

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Component = steps[step];
  return <Component onNextClick={() => setStep((step) => step + 1)} />;
};

export default Authenticate;
