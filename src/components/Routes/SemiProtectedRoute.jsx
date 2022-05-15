import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { selectAuth, selectUser } from '../../store/authSlice';

const SemiProtectedRoute = ({ children, ...rest }) => {
  const isAuthed = useSelector(selectAuth);
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthed ? (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        ) : isAuthed && !user.activated ? (
          children
        ) : (
          <Redirect to={{ pathname: '/rooms', state: { from: location } }} />
        )
      }
    />
  );
};

export default SemiProtectedRoute;
