import React from 'react';
import styles from './TextInput.module.css';

const TextInput = ({ fullWidth, style, ...rest }) => {
  return (
    <input
      {...rest}
      className={styles.input}
      style={{
        width: fullWidth ? '100%' : '290px',
        ...style,
      }}
    />
  );
};

export default TextInput;
