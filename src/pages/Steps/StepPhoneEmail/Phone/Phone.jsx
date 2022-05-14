import React, { useState } from 'react';
import Card from '../../../../components/shared/Card/Card';
import styles from '../StepPhoneEmail.module.css';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';

const Phone = ({ onNextClick }) => {
  const [phone, setPhone] = useState('');

  return (
    <Card heading={'Enter Your Phone Number'} icon="phone" iconAlt="Phone icon">
      <TextInput
        type="tel"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button
        text="Request OTP"
        icon="arrow"
        iconAlt="Arrow icon"
        onClick={onNextClick}
      />
      <p className={styles.paragraph}>
        By entering your phone number, you’re agreeing to our Terms of Service
        and Privacy Policy. Thanks!
      </p>
    </Card>
  );
};

export default Phone;
