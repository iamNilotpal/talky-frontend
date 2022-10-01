import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateAvatar } from '../../../services/api/user-service';
import {
  selectLoading,
  selectUser,
  setAuth,
  setLoading,
} from '../../../store/authSlice';

import { FILE_TYPES, MAX_ALLOWED_SIZE } from '../../../constants';
import { toastifyErrorMessage, toastifySuccessMessage } from '../../../utils';
import styles from './Avatar.module.css';

const Avatar = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);

  const onAvatarChange = (e) => {
    const image = e.target.files[0];
    if (!image) return;

    if (!FILE_TYPES.includes(image.type))
      return toastifyErrorMessage('Only PNG and JPEG files are allowed.');

    if (image.size > MAX_ALLOWED_SIZE)
      return toastifyErrorMessage('File size bigger than 3 MB.');

    dispatch(setLoading(true));
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = () => {
      const imageToUpload = reader.result;

      updateAvatar({ avatar: imageToUpload })
        .then(({ data }) => {
          if (data.ok) {
            toastifySuccessMessage('Profile updated.');
            dispatch(setAuth(data.user));
          }
        })
        .catch((e) =>
          toastifyErrorMessage(e?.response?.data.message || e.message)
        )
        .finally(() => dispatch(setLoading(false)));
    };
  };

  return (
    <div className={styles.container}>
      <h1>Profile Picture</h1>
      <div className={styles.avatarWrapper}>
        <img src={user.avatar} alt="profile" />
        <div
          className={styles.editAvatar}
          onClick={() => inputRef.current?.click()}
        >
          <img src="/images/edit.svg" alt="" />
          <p>Edit</p>
        </div>
        <input
          type="file"
          id="avatarInput"
          aria-label="Avatar input"
          onChange={onAvatarChange}
          accept="image/png, image/jpeg"
          ref={inputRef}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Avatar;
