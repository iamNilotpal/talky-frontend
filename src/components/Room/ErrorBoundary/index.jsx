import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../shared/Button/Button';
import styles from './ErrorBoundary.module.css';

const RoomErrorBoundary = ({ loading, error, children }) => {
  const history = useHistory();

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <h1>GETTING ROOM INFORMATION...</h1>
      </div>
    );

  if (error)
    return (
      <div className={styles.errorContainer}>
        <h1>Oops! {error.message.toUpperCase()}..</h1>
        <Button
          text="Go To Rooms Page"
          onClick={() => history.push('/rooms')}
        />
      </div>
    );

  return children;
};

export default RoomErrorBoundary;
