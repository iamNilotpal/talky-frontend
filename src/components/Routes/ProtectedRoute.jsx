import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

const SemiProtectedRoute = ({ children, ...rest }) => {
  const isAuth = true;
  const user = { name: 'Nilotpal', activated: false };

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuth ? (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        ) : isAuth && !user.activated ? (
          <Redirect
            to={{ pathname: '/activate', state: { from: location, user } }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default SemiProtectedRoute;
