import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useWebRTC } from '../../hooks/useWebRTC';
import { selectUser } from '../../store/authSlice';

const Room = () => {
  const { roomId } = useParams();
  const user = useSelector(selectUser);
  const { clients, updateAudioRef } = useWebRTC(roomId, user);

  return (
    <div className='container'>
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
  );
};

export default Room;
