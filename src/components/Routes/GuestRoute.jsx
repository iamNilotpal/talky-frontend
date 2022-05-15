import React from 'react';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/authSlice';

const GuestRoute = ({ children, ...rest }) => {
  const isAuthed = useSelector(selectAuth);
  const { state } = useLocation();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthed ? (
          <Redirect
            to={{
              pathname: state?.from || '/rooms',
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default GuestRoute;
