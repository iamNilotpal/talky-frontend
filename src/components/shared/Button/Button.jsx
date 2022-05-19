import React from 'react';
import styles from './Button.module.css';

const Button = ({
  text,
  onClick,
  type = 'button',
  icon = 'arrow',
  iconAlt = 'Arrow icon',
  disabled,
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
      }}
    >
      <span>{text}</span>
      <img src={`/images/${icon}.svg`} alt={iconAlt} />
    </button>
  );
};

export default Button;
