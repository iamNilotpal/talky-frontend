import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={`conatiner ${styles.navbar}`}>
      <Link to="/" className={styles.logo}>
        <img
          src="/logo192.png"
          alt="Site logo"
          style={{ height: '25px', marginRight: '8px' }}
        />
        <span>Talky</span>
      </Link>
    </nav>
  );
};

export default Navigation;
