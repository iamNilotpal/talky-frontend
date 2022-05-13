import React, { useState } from 'react';
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail';
import StepOtp from '../Steps/StepOtp/StepOtp';

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Login = () => {
  const [step, setStep] = useState(1);
  const Component = steps[step];

  return (
    <div>
      <Component onNextClick={() => setStep((step) => step + 1)} />
    </div>
  );
};

export default Login;
