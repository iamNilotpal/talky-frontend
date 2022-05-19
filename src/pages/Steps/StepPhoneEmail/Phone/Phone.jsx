import React, { useState } from 'react';
import Card from '../../../../components/shared/Card/Card';
import styles from '../StepPhoneEmail.module.css';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import { sendOtp } from '../../../../api/otp-service';
import { toastifyErrorMessage } from '../../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoading,
  setOtpData,
  setLoading,
} from '../../../../store/authSlice';

const Phone = ({ onNextClick }) => {
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const handleOtpSend = async () => {
    try {
      if (!phone) return toastifyErrorMessage('Enter your phone number');
      dispatch(setLoading(true));
      const { data } = await sendOtp(phone);
      dispatch(setLoading(false));
      if (data) {
        console.log('just for testing purpose', data.otp);
        dispatch(setOtpData({ phone: data.phone, hash: data.hash }));
        onNextClick();
      }
    } catch (error) {
      dispatch(setLoading(false));
      toastifyErrorMessage(error.message || error.response.data.message);
    }
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
      <Button text="Request OTP" onClick={handleOtpSend} disabled={loading} />
      <p className={styles.paragraph}>
        By entering your phone number, you’re agreeing to our Terms of Service
        and Privacy Policy. Thanks!
      </p>
    </Card>
  );
};

export default Phone;
