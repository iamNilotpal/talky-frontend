import React from 'react';
import Tooltip from '../../Tooltip';
import styles from './CreateRoomButton.module.css';

const CreateRoomButton = ({
  icon = 'setting',
  alt = 'Settings icon',
  text = 'Create a room',
  ...rest
}) => {
  return (
    <button
      className={styles.createRoomButton}
      {...rest}
      data-tip
      data-for="createRoomButton"
    >
      <img
        src={`/images/${icon}.svg`}
        alt={alt}
        style={{ marginBottom: icon === 'setting' ? '0px' : '5px' }}
      />
      <span>{text}</span>
      <Tooltip id="createRoomButton" multiline place="top">
        Create room and invite your friends
      </Tooltip>
    </button>
  );
};

export default CreateRoomButton;
