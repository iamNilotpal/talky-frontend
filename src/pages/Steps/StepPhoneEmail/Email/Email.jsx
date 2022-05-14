import React, { useState } from 'react';
import Card from '../../../../components/shared/Card/Card';
import styles from '../StepPhoneEmail.module.css';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';

const Email = ({ onNextClick }) => {
  const [email, setEmail] = useState('');

  return (
    <Card
      heading={'Enter Your Email Address'}
      icon="email"
      iconAlt="Email icon"
    >
      <TextInput
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        text="Next"
        icon="arrow"
        iconAlt="Arrow icon"
        onClick={onNextClick}
      />
      <p className={styles.paragraph}>
        By entering your email, you’re agreeing to our Terms of Service and
        Privacy Policy. Thanks!
      </p>
    </Card>
  );
};

export default Email;
