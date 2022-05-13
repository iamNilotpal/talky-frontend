import React from 'react';
import Card from '../../../components/shared/Card/Card';

const StepOtp = ({ onNextClick }) => {
  return (
    <>
      <Card heading="Enter OTP" icon={'logo'}>
        <button onClick={onNextClick}>Next</button>
      </Card>
    </>
  );
};

export default StepOtp;
