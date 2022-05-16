import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import GuestRoute from './components/Routes/GuestRoute';
import SemiProtectedRoute from './components/Routes/SemiProtectedRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Navigation from './components/shared/Navigation/Navigation';
import Activate from './pages/Activate/Activate';
import Authenticate from './pages/Authenticate/Authenticate';
import Home from './pages/Home/Home';
import Rooms from './pages/Rooms/Rooms';
import { Toaster } from 'react-hot-toast';
import { useRefreshToken } from './hooks/useRefreshToken';
import Loader from './components/Loader/Screen/Screen';

const App = () => {
  const loading = useRefreshToken();

  if (loading) return <Loader />;

  return (
    <Router>
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
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <Toaster />
    </Router>
  );
};

export default App;
