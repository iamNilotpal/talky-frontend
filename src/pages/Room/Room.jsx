import React from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Room = () => {
  const { roomId } = useParams();
  const { state } = useLocation();
  return (
    <div className="container">
      <h1>Room Id: {roomId}</h1>
      <h1>{state && JSON.stringify(state.room, null, 4)}</h1>
    </div>
  );
};

export default Room;
