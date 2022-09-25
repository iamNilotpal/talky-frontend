import React from 'react';
import { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useRefreshToken } from './hooks/useRefreshToken';

import Loader from './components/Loader/Screen/Screen';
import GuestRoute from './components/Routes/GuestRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import SemiProtectedRoute from './components/Routes/SemiProtectedRoute';
import Border from './components/shared/Border/Border';
import Navigation from './components/shared/Navigation/Navigation';

import Activate from './pages/Activate/Activate';
import Authenticate from './pages/Authenticate/Authenticate';
import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import Rooms from './pages/Rooms/Rooms';

const App = () => {
  const loading = useRefreshToken();

  if (loading) return <Loader />;

  return (
    <Router>
      <Border />
      <Navigation />
      <Switch>
        <GuestRoute path="/" exact>
          <Home />
        </GuestRoute>
        <GuestRoute path="/authenticate">
          <Authenticate />
        </GuestRoute>
        <SemiProtectedRoute path="/activate">
          <Activate />
        </SemiProtectedRoute>
        <ProtectedRoute path="/rooms">
          <Rooms />
        </ProtectedRoute>
        <ProtectedRoute path="/room/:roomId">
          <Room />
        </ProtectedRoute>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <Toaster />
    </Router>
  );
};

export default App;
