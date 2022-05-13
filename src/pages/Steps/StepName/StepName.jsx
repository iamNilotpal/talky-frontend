import React from 'react';
import Card from '../../../components/shared/Card/Card';

const StepName = ({ onNextClick }) => {
  return (
    <>
      <Card heading="Enter Your Name" icon={'logo'}>
        <button onClick={onNextClick}>Next</button>
      </Card>
    </>
  );
};

export default StepName;
