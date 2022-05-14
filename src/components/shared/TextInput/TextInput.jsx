import React from 'react';
import styles from './TextInput.module.css';

const TextInput = (props) => {
  return <input {...props} className={styles.input} />;
};

export default TextInput;
