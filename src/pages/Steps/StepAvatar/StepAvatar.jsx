import React from 'react';
import Card from '../../../components/shared/Card/Card';

const StepAvatar = ({ onNextClick }) => {
  return (
    <>
      <Card heading="Choose Avatar" icon={'logo'}>
        <button onClick={onNextClick}>Next</button>
      </Card>
    </>
  );
};

export default StepAvatar;
