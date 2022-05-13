import React from 'react';
import Card from '../../../components/shared/Card/Card';

const StepPhoneEmail = ({ onNextClick }) => {
  return (
    <>
      <Card heading="Enter Phone" icon={'logo'}>
        <button onClick={onNextClick}>Next</button>
      </Card>
    </>
  );
};

export default StepPhoneEmail;
