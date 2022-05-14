import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

const GuestRoute = ({ children, ...rest }) => {
  const isAuth = false;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          <Redirect to={{ pathname: '/rooms', state: { from: location } }} />
        ) : (
          children
        )
      }
    />
  );
};

export default GuestRoute;
