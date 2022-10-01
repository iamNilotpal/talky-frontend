import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updatePersonalInfo } from '../../../services/api/user-service';
import { setLoading } from '../../../store/activateSlice';
import { selectLoading, selectUser, setAuth } from '../../../store/authSlice';
import { toastifyErrorMessage, toastifySuccessMessage } from '../../../utils';

import Button from '../../shared/Button/Button';
import TextInput from '../../shared/TextInput/TextInput';
import styles from './ProfileData.module.css';

const ProfileData = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [form, setForm] = useState({
    email: user.email,
    phone: user.phone,
    name: user.name,
    avatar: user.avatar,
  });

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const updateInfo = () => {
    dispatch(setLoading(true));
    updatePersonalInfo({
      email: form.email,
      phone: form.phone,
      name: form.name,
    })
      .then(({ data }) => {
        if (data.ok) {
          dispatch(setAuth(data.user));
          toastifySuccessMessage('Information updated.');
        }
      })
      .catch((e) =>
        toastifyErrorMessage(e?.response?.data.message || e.message)
      )
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <div>
      <h1 style={{ marginBlock: '25px' }}>Personal Information</h1>
      <div className={styles.basicInfo}>
        <TextInput
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Your name"
          fullWidth={true}
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
            placeholder="Your phone number"
            fullWidth={true}
            style={{
              textAlign: 'left',
            }}
          />
        )}
        {user.email && (
          <TextInput
            name="email"
            value={form.email}
            fullWidth={true}
            placeholder="Your email"
            onChange={onChange}
            style={{
              textAlign: 'left',
            }}
          />
        )}
      </div>
      <div className={styles.saveButton}>
        <Button text="Save Changes" onClick={updateInfo} disabled={loading} />
      </div>
    </div>
  );
};

export default ProfileData;
