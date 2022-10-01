import emailValidator from 'email-validator';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../../../../services/api/otp-service';
import Button from '../../../../components/shared/Button/Button';
import Card from '../../../../components/shared/Card/Card';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import {
  selectLoading,
  setLoading,
  setOtpData,
} from '../../../../store/authSlice';
import { toastifyErrorMessage } from '../../../../utils';
import styles from '../StepPhoneEmail.module.css';

const Email = ({ onNextClick }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const handleOtpSend = async () => {
    try {
      if (!email) return toastifyErrorMessage('Enter your phone number');
      const isValid = emailValidator.validate(email);
      if (!isValid) return toastifyErrorMessage('Input a valid email.');

      dispatch(setLoading(true));
      const { data } = await sendOtp({ email });
      dispatch(setLoading(false));

      if (data) {
        console.log('Your OTP', data.otp);
        dispatch(setOtpData({ email: data.email, hash: data.hash }));
        onNextClick();
      }
    } catch (error) {
      dispatch(setLoading(false));
      toastifyErrorMessage(error.message || error.response.data.message);
    }
  };

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
      <Button text="Request OTP" onClick={handleOtpSend} disabled={loading} />
      <p className={styles.paragraph}>
        By entering your email, you’re agreeing to our Terms of Service and
        Privacy Policy. Thanks!
      </p>
    </Card>
  );
};

export default Email;
