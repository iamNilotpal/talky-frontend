import React from 'react';
import styles from './Spinner.module.css';

const LoaderSpinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

export default LoaderSpinner;
