import React, { useEffect, useState } from 'react';
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css';
import { sendOtp, verifyOtp } from '../../../api/otp-service';
import { toastifyErrorMessage, toastifySuccessMessage } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoading,
  selectOtpData,
  setAuth,
  setLoading,
  setOtpData,
} from '../../../store/authSlice';

const StepOtp = () => {
  const [otp, setOtp] = useState('');
  const { hash, phone } = useSelector(selectOtpData);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => toastifySuccessMessage('OTP sent to your phone number.'), []);

  const handleOtpVerification = () => {
    if (!otp) return toastifyErrorMessage('Enter 4-digit code sent your phone');
    dispatch(setLoading(true));
    verifyOtp(phone, otp, hash)
      .then(({ data }) => {
        dispatch(setLoading(false));
        if (data.authed && data.ok) dispatch(setAuth(data.user));
      })
      .catch(({ response }) => {
        dispatch(setLoading(false));
        toastifyErrorMessage(response.data.message);
      });
  };

  const handleOtpSend = async () => {
    if (!phone) return toastifyErrorMessage('Enter your mobile number.');
    sendOtp(phone)
      .then(({ data }) => {
        toastifySuccessMessage('OTP sent to your phone.');
        console.log('Your OTP', data.otp);
        dispatch(setOtpData({ phone: data.phone, hash: data.hash }));
      })
      .catch((e) => toastifyErrorMessage(e.message || e.response.data.message));
  };

  return (
    <div className={`${styles.cardWrapper} margin_top--big`}>
      <Card heading="Enter 4-Digit Code" icon="lock" iconAlt="Lock icon">
        <TextInput
          type="tel"
          placeholder="Enter the code we just texted you"
          value={otp}
          onChange={(e) =>
            setOtp((otp) => (e.target.value.length < 5 ? e.target.value : otp))
          }
        />
        <div className={styles.otpWrapper}>
          <Button
            text="Verify OTP"
            onClick={handleOtpVerification}
            disabled={loading}
          />
          <span onClick={handleOtpSend} id={styles.resend}>
            Didn't receive? Resend Otp
          </span>
        </div>

        <p className={styles.paragraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </Card>
    </div>
  );
};

export default StepOtp;
