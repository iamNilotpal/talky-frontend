import React, { useState } from 'react';
import styles from './AddRoomModal.module.css';
import TextInput from '../shared/TextInput/TextInput';
import CreateRoomButton from '../shared/CreateRoomButton/CreateRoomButton';
import { roomTypes } from '../../constants';

const AddRoomModal = ({ onModalClose }) => {
  const [input, setInput] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('open');

  return (
    <div
      className={styles.modalMask}
      onClick={(e) => {
        if (e.target.classList.contains(styles.modalMask)) onModalClose(e);
      }}
    >
      <div className={styles.modalBody}>
        <img
          src="/images/x.svg"
          alt="Close iocn"
          id={styles.closeButton}
          onClick={onModalClose}
        />
        <div>
          <h1 className={styles.modalHeadingText}>
            Enter the topic to be discussed
          </h1>
          <TextInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth={true}
            placeholder="What's your discussion topic..."
          />
        </div>
        <div className={styles.roomInfo}>
          <h1 className={styles.modalHeadingText}>Room Type</h1>
          <ul className={styles.roomTypes}>
            {roomTypes.map((roomType) => (
              <li
                key={roomType.value}
                className={`${styles.typeBox} ${
                  selectedRoom === roomType.value ? styles.active : ''
                }`}
                onClick={() => setSelectedRoom(roomType.value)}
              >
                <img src={roomType.icon} alt={`${roomType.name} icon`} />
                <span>{roomType.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.modalCreateWrapper}>
          <h3>Start your room and get started</h3>
          <CreateRoomButton
            text="Create Your Room"
            icon="fire"
            alt="Fire icon"
          />
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
