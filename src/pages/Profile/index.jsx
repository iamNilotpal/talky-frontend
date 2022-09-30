import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteAccount } from '../../api/user-service';
import Avatar from '../../components/Profile/Avatar';
import DeleteAccountModal from '../../components/Profile/DeleteAccountModal';

import ProfileData from '../../components/Profile/ProfileData';
import Button from '../../components/shared/Button/Button';
import { selectLoading, setAuth, setLoading } from '../../store/authSlice';
import { toastifyErrorMessage, toastifySuccessMessage } from '../../utils';
import styles from './Profile.module.css';

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [showModal, setShowModal] = useState(false);

  const onDeleteAccount = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await deleteAccount();

      if (data.ok) {
        dispatch(setLoading(false));
        toastifySuccessMessage('Account deleted );');
        dispatch(setAuth(data.user));
      }
    } catch (e) {
      dispatch(setLoading(false));
      toastifyErrorMessage(e?.response?.data.message || e.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <img
          src="/images/arrow.svg"
          alt="arrow left"
          className={styles.backButton}
          onClick={() => history.goBack()}
        />
        <h1>Account Settings</h1>
      </div>
      <div className={styles.border} />
      <section className={styles.information}>
        <Avatar />
        <ProfileData />
        <div className={styles.dangerZone}>
          <h1>Danger Zone</h1>
          <p>
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button
            text="Delete My Account"
            onClick={() => setShowModal(true)}
            disabled={loading}
            style={{ marginLeft: '-5px' }}
          />
          {showModal && (
            <DeleteAccountModal
              onModalClose={() => setShowModal(false)}
              onDeleteAccount={onDeleteAccount}
              loading={loading}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
