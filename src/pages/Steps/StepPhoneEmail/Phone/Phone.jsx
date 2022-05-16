import React, { useState } from 'react';
import Card from '../../../../components/shared/Card/Card';
import styles from '../StepPhoneEmail.module.css';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import { sendOtp } from '../../../../api/otp-service';
import { errorToast } from '../../../../utils';
import { useDispatch } from 'react-redux';
import { setOtpData } from '../../../../store/authSlice';

const Phone = ({ onNextClick }) => {
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  const handleOtpSend = async () => {
    if (!phone) return errorToast('Enter your phone number');
    const { data } = await sendOtp(phone);
    console.log(data);
    dispatch(setOtpData({ phone: data.phone, hash: data.hash }));
    onNextClick();
  };

  return (
    <Card
      heading={'Enter Your Phone Number'}
      icon="shock"
      iconAlt="Shock emoji icon"
    >
      <TextInput
        type="tel"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button text="Request OTP" onClick={handleOtpSend} />
      <p className={styles.paragraph}>
        By entering your phone number, you’re agreeing to our Terms of Service
        and Privacy Policy. Thanks!
      </p>
    </Card>
  );
};

export default Phone;
