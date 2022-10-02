import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import RoomBottomBar from '../../components/Room/BottomBar';
import RoomErrorBoundary from '../../components/Room/ErrorBoundary';

import { useRoom } from '../../hooks/useRoom';
import { useWebRTC } from '../../hooks/useWebRTC';
import { selectUser } from '../../store/authSlice';
import styles from './Room.module.css';

const Room = () => {
  const { roomId } = useParams();
  const user = useSelector(selectUser);
  const { room, error, loading } = useRoom(roomId);
  const { clients, updateAudioRef } = useWebRTC(roomId, user);

  return (
    <RoomErrorBoundary loading={loading} error={error}>
      <main>
        <div className={styles.container}>
          {clients.map((client) => (
            <p key={client.id}>
              <span>{client.name}</span>
              <audio
                controls
                ref={(instance) => updateAudioRef(instance, client.id)}
                autoPlay
              />
            </p>
          ))}
        </div>
        <RoomBottomBar room={room} />
      </main>
    </RoomErrorBoundary>
  );
};

export default Room;
