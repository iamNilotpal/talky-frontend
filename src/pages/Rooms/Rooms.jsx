import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';
import styles from './Rooms.module.css';

const Rooms = () => {
  const user = useSelector(selectUser);
  return (
    <main className="container">
      <div className={styles.roomHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.heading}>All voice rooms</h1>
          <div className={styles.searchBoxWrapper}>
            <img src="/images/search.svg" alt="Search icon" />
            <input type="text" className={styles.searchBox} />
          </div>
        </div>
        <div className={styles.headerRight}></div>
      </div>
    </main>
  );
};

export default Rooms;
