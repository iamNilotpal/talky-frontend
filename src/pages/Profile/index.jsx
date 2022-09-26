import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';

const Profile = () => {
  const user = useSelector(selectUser);
  return <div>{JSON.stringify(user, null, 4)}</div>;
};

export default Profile;
