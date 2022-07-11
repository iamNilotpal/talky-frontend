import React from 'react';
import Border from '../../shared/Border/Border';
import styles from './Screen.module.css';

const Loader = ({ message = 'Loading' }) => {
  const splittedMsg = message.split('');
  return (
    <>
      <Border />
      <div className={styles.loader}>
        {splittedMsg.map((char) => (
          <span key={char}>{char}</span>
        ))}
      </div>
    </>
  );
};

export default Loader;
