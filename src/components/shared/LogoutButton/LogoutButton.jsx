import React from 'react';
import styles from './LogoutButton.module.css';

const LogoutButton = ({ onClick }) => {
  return (
    <button type="button" id={styles.button} onClick={onClick}>
      <span>Logout</span>
      <img src={'/images/logout.svg'} alt="logout icon" />
    </button>
  );
};

export default LogoutButton;
