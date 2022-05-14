import React, { useState } from 'react';
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css';

const StepOtp = ({ onNextClick }) => {
  const [otp, setOtp] = useState('');

  return (
    <div className={styles.cardWrapper}>
      <Card heading="Enter The OTP" icon="lock" iconAlt="Lock icon">
        <TextInput
          type="tel"
          placeholder="Enter the code we just texted you"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button text="Verify OTP" icon="arrow" iconAlt="Arrow icon" />
        <p className={styles.paragraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </Card>
    </div>
  );
};

export default StepOtp;
