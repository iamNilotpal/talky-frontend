import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../api/otp-service';
import { setName } from '../../../store/activateSlice';
import {
  selectAuth,
  selectUser,
  setAuth,
  setOtpData,
} from '../../../store/authSlice';
import { errorToast } from '../../../utils';
import Button from '../Button/Button';
import styles from './Navigation.module.css';

const Navigation = () => {
  const user = useSelector(selectUser);
  const authed = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      errorToast('Logged out :)');
      dispatch(setAuth(data.user));
      dispatch(setOtpData({ phone: '', hash: '' }));
      dispatch(setName(''));
    } catch ({ response }) {
      errorToast(response.data.message);
      dispatch(setAuth(response.data.user));
    }
  };

  return (
    <nav className={`conatiner ${styles.navbar}`}>
      <Link to="/" className={styles.logo}>
        <img
          src="/images/logo192.svg"
          alt="Site logo"
          style={{ height: '30px', marginRight: '8px' }}
        />
        <span>Talky</span>
      </Link>
      {authed && (
        <div className={styles.logoutWrapper}>
          {user.activated && (
            <figure className={styles.avatar}>
              <img src={user.avatar} alt="User avatar" />
            </figure>
          )}
          <Button onClick={handleLogout} text="Logout" />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
