import React from 'react';
import styles from './Button.module.css';

const Button = ({
  text,
  onClick,
  type = 'button',
  icon = 'arrow',
  iconAlt = 'Arrow icon',
}) => {
  return (
    <button type={type} id={styles.button} onClick={onClick}>
      <span>{text}</span>
      <img src={`/images/${icon}.svg`} alt={iconAlt} />
    </button>
  );
};

export default Button;
