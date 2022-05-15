import React, { useState } from 'react';
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css';
import { verifyOtp } from '../../../api/otp-service';
import { errorToast } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectOtpData, setAuth } from '../../../store/authSlice';

const StepOtp = () => {
  const [otp, setOtp] = useState('');
  const { hash, phone } = useSelector(selectOtpData);
  const dispatch = useDispatch();

  const handleOtpVerification = async () => {
    try {
      if (!otp) return errorToast('Enter 4-digit code sent your phone');
      const { data } = await verifyOtp(phone, otp, hash);
      console.log(data);
      dispatch(setAuth(data.user));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <Card heading="Enter The OTP" icon="lock" iconAlt="Lock icon">
        <TextInput
          type="tel"
          placeholder="Enter the code we just texted you"
          value={otp}
          onChange={(e) =>
            setOtp((otp) => (e.target.value.length < 5 ? e.target.value : otp))
          }
        />
        <Button
          text="Verify OTP"
          icon="arrow"
          iconAlt="Arrow icon"
          onClick={handleOtpVerification}
        />
        <p className={styles.paragraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </Card>
    </div>
  );
};

export default StepOtp;
