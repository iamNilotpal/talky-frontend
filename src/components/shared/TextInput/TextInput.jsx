import React from 'react';
import styles from './TextInput.module.css';

const TextInput = ({ fullWidth, ...rest }) => {
  return (
    <input
      {...rest}
      className={styles.input}
      style={{
        width: fullWidth ? '100%' : '290px',
      }}
    />
  );
};

export default TextInput;
