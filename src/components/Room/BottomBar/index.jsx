import React, { useState } from 'react';

import Tooltip from '../../Tooltip';
import styles from './RoomBottomTab.module.css';
import { SOCKET_EVENTS } from '../../../services/socket/events';
import { initSocket } from '../../../services/socket';
import { useEffect } from 'react';
import { useRef } from 'react';

const BottomBar = ({ room }) => {
  const [muted, setMuted] = useState(false);
  const socket = useRef();

  useEffect(() => {
    socket.current = initSocket();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.roomInfo}>
        <p data-tip data-for="roomTopic">
          You in{' '}
          {room.topic.length > 25
            ? `${room.topic.substr(0, 25)}...`
            : room.topic}
        </p>
        {room.totalPeople - 1 === 0 ? (
          <p>No one has joined yet.</p>
        ) : (
          <p>{room.totalPeople - 1} together with you</p>
        )}
        {room.topic.length > 25 && (
          <Tooltip id="roomTopic" place="top">
            {room.topic}
          </Tooltip>
        )}
      </div>
      <div className={styles.actions}>
        <img
          src={muted ? '/images/microphone-mute.svg' : '/images/microphone.svg'}
          alt="microphone"
          onClick={() => setMuted((prev) => !prev)}
          data-tip
          data-for="microphone"
        />
        <img
          data-tip
          data-for="leave"
          src="/images/leave.svg"
          alt="leave icon"
          onClick={() =>
            socket.current.emit(SOCKET_EVENTS.LEAVE, { roomId: room.id })
          }
        />
      </div>
      <Tooltip place="top" id="microphone">
        {muted ? 'Unmute' : 'Mute'}
      </Tooltip>
      <Tooltip place="top" id="leave">
        Leave Room
      </Tooltip>
    </div>
  );
};

export default BottomBar;
