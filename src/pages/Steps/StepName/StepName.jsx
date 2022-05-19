import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import styles from './StepName.module.css';
import TextInput from '../../../components/shared/TextInput/TextInput';
import Button from '../../../components/shared/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectName, setName } from '../../../store/activateSlice';
import { toastifyErrorMessage } from '../../../utils';

const StepName = ({ onNextClick }) => {
  const name = useSelector(selectName);
  const [fullName, setFullName] = useState(name);
  const dispatch = useDispatch();

  const onNext = () => {
    if (!fullName) return toastifyErrorMessage('Type your name.');
    dispatch(setName(fullName));
    onNextClick();
  };

  return (
    <section className={`${styles.cardWrapper} margin_top--big`}>
      <Card heading="What is your full name?" icon={'cool'}>
        <TextInput
          type="text"
          placeholder="Type your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <p className={styles.paragraph}>
          You can use your real name or any other name. Your name will only be
          used to show in rooms you join.
        </p>
        <Button onClick={onNext} text="Next" />
      </Card>
    </section>
  );
};

export default StepName;
