import React from 'react';
import Border from '../../shared/Border/Border';
import styles from './Screen.module.css';

const Loader = ({ message = 'Loading' }) => {
  const splitMsg = message.split('');

  return (
    <>
      <Border />
      <div className={styles.loader}>
        {splitMsg.map((char) => (
          <span key={char}>{char}</span>
        ))}
      </div>
    </>
  );
};

export default Loader;
