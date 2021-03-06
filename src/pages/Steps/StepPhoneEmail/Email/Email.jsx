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
      icon="shock"
      iconAlt="Shock emoji icon"
    >
      <TextInput
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button text="Request OTP" onClick={onNextClick} />
      <p className={styles.paragraph}>
        By entering your email, you’re agreeing to our Terms of Service and
        Privacy Policy. Thanks!
      </p>
    </Card>
  );
};

export default Email;
