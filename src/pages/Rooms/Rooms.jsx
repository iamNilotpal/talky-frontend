import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';

const Rooms = () => {
  const user = useSelector(selectUser);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <h1>Welcome, {user.name}</h1>
      <h3>Phone: {user.phone}</h3>
      <img
        src={user.avatar}
        alt="Avatar"
        style={{ borderRadius: '50%', border: '5px solid #0077ff' }}
      />
    </div>
  );
};

export default Rooms;
