import React from 'react';
import styles from './Avatar.module.css';

const Avatar = ({ image, onChange }) => {
  return (
    <>
      <div className={styles.avatarWrapper}>
        <img src={image} alt="User avatar" />
      </div>
      <div className={styles.chooseAvatar}>
        <input
          type="file"
          id="avatarInput"
          aria-label="Avatar input"
          onChange={onChange}
        />
        <label htmlFor="avatarInput" aria-label="Avatar input">
          Choose a different image
        </label>
      </div>
    </>
  );
};

export default Avatar;
