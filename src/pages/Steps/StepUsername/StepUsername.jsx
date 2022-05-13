import React from 'react';
import Card from '../../../components/shared/Card/Card';

const StepUsername = ({ onNextClick }) => {
  return (
    <>
      <Card heading="Enter Username" icon={'logo'}>
        <button onClick={onNextClick}>Next</button>
      </Card>
    </>
  );
};

export default StepUsername;
