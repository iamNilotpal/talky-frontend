import React, { useState } from 'react';
import Email from './Email/Email';
import Phone from './Phone/Phone';
import styles from './StepPhoneEmail.module.css';

const phoneEmailAuth = Object.freeze({
  phone: Phone,
  email: Email,
});

const StepPhoneEmail = ({ onNextClick }) => {
  const [type, setType] = useState('phone');
  const Component = phoneEmailAuth[type];

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.buttonWrap}>
        <button
          className={`${styles.tapButton} ${
            type === 'phone' ? styles.active : ''
          }`}
          onClick={() => setType('phone')}
        >
          <img src="/images/phone.svg" alt="Phone icon" />
        </button>
        <button
          className={`${styles.tapButton} ${
            type === 'email' ? styles.active : ''
          }`}
          onClick={() => setType('email')}
        >
          <img src="/images/email.svg" alt="Email icon" />
        </button>
      </div>
      <Component onNextClick={onNextClick} />
    </div>
  );
};

export default StepPhoneEmail;
