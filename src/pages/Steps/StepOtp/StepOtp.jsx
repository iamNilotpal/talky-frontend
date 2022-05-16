import React, { useEffect, useState } from 'react';
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css';
import { sendOtp, verifyOtp } from '../../../api/otp-service';
import { errorToast, successToast } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectOtpData, setAuth, setOtpData } from '../../../store/authSlice';

const StepOtp = () => {
  const [otp, setOtp] = useState('');
  const { hash, phone } = useSelector(selectOtpData);
  const dispatch = useDispatch();

  useEffect(() => successToast('OTP sent to your phone number.'), []);

  const handleOtpVerification = () => {
    if (!otp) return errorToast('Enter 4-digit code sent your phone');
    verifyOtp(phone, otp, hash)
      .then(({ data }) => {
        if (data.authed && data.ok) dispatch(setAuth(data.user));
      })
      .catch(({ response }) => errorToast(response.data.message));
  };

  const handleOtpSend = async () => {
    if (!phone) return errorToast('Enter your mobile number.');
    sendOtp(phone)
      .then(({ data }) => {
        successToast('OTP sent to your phone.');
        console.log(data);
        dispatch(setOtpData({ phone: data.phone, hash: data.hash }));
      })
      .catch(({ response }) => errorToast(response.data.message));
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
          <Button text="Verify OTP" onClick={handleOtpVerification} />
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
