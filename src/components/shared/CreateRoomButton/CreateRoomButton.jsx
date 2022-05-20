import React from 'react';
import styles from './CreateRoomButton.module.css';

const CreateRoomButton = ({
  icon = 'setting',
  alt = 'Settings icon',
  text = 'Create a room',
  ...rest
}) => {
  return (
    <button className={styles.createRoomButton} {...rest}>
      <img
        src={`/images/${icon}.svg`}
        alt={alt}
        style={{ marginBottom: icon === 'setting' ? '0px' : '5px' }}
      />
      <span>{text}</span>
    </button>
  );
};

export default CreateRoomButton;
