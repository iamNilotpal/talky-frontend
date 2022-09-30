import React from 'react';
import styles from './Button.module.css';

const Button = ({
  text,
  onClick,
  type = 'button',
  icon = 'arrow',
  disabled,
  style = {},
}) => {
  return (
    <button
      type={type}
      id={styles.button}
      onClick={onClick}
      disabled={disabled}
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'progress' : 'pointer',
        ...style,
      }}
    >
      <span>{text}</span>
      <img src={`/images/${icon}.svg`} alt="" />
    </button>
  );
};

export default Button;
