import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectLoading, selectUser } from '../../store/authSlice';
import styles from './Profile.module.css';

import Button from '../../components/shared/Button/Button';
import TextInput from '../../components/shared/TextInput/TextInput';

const Profile = () => {
  const user = useSelector(selectUser);
  const [form, setForm] = useState({
    email: user.email,
    phone: user.phone,
    name: user.name,
    password: '',
    newPassword: '',
  });
  const loading = useSelector(selectLoading);
  const history = useHistory();

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className={styles.container}>
      <div>
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
      </div>

      <section className={styles.information}>
        <h1 style={{ marginBlock: '25px' }}>Personal Information</h1>
        <div className={styles.basicInfo}>
          <TextInput
            name="name"
            value={form.name}
            onChange={onChange}
            style={{
              textAlign: 'left',
              marginRight: '15px',
            }}
          />
          {user.phone && (
            <TextInput
              name="phone"
              value={form.phone}
              onChange={onChange}
              style={{
                textAlign: 'left',
              }}
            />
          )}
          {user.email && (
            <TextInput
              name="email"
              value={form.email}
              onChange={onChange}
              style={{
                textAlign: 'left',
              }}
            />
          )}
        </div>
        <div className={styles.saveButton}>
          <Button
            icon=""
            text="Save Changes"
            onClick={() => {}}
            disabled={loading}
          />
        </div>
      </section>

      <section className={styles.information}>
        <div className={styles.basicInfo}>
          <TextInput
            name="password"
            value={form.password}
            placeholder="Old password"
            onChange={onChange}
            style={{
              textAlign: 'left',
              marginRight: '15px',
            }}
          />
          <TextInput
            name="newPassword"
            value={form.newPassword}
            placeholder="New password"
            onChange={onChange}
            style={{
              textAlign: 'left',
            }}
          />
        </div>
        <div className={styles.saveButton}>
          <Button
            icon=""
            text="Update Password"
            onClick={() => {}}
            disabled={loading}
          />
        </div>
      </section>
    </div>
  );
};

export default Profile;
