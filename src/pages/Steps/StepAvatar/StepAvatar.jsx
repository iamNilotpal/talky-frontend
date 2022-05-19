import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateUser } from '../../../api/otp-service';
import LoaderSpinner from '../../../components/Loader/Spinner/Spinner';
import Avatar from '../../../components/shared/Avatar/Avatar';
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import {
  selectAvatar,
  selectLoading,
  selectName,
  setAvatar,
  setLoading,
} from '../../../store/activateSlice';
import { setAuth } from '../../../store/authSlice';
import { toastifyErrorMessage } from '../../../utils';
import styles from './StepAvatar.module.css';
const MAX_ALLOWD_SIZE = 3 * 1024 * 1024; // 3 MB
const fileTypes = ['image/png', 'image/gif', 'image/jpeg'];

const StepAvatar = () => {
  const [unMounted, setUnMounted] = useState(false);
  const name = useSelector(selectName);
  const avatar = useSelector(selectAvatar);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    return () => setUnMounted(true);
  }, []);

  const handleAvatarChange = (e) => {
    const image = e.target.files[0];
    if (!image) return;

    if (!fileTypes.includes(image.type))
      return toastifyErrorMessage('Only PNG and JPEG files are allowed.');

    if (image.size > MAX_ALLOWD_SIZE)
      return toastifyErrorMessage('File size bigger than 3 MB.');

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => dispatch(setAvatar(reader.result));
  };

  const handleActivateUser = () => {
    dispatch(setLoading(true));
    activateUser({ name, avatar: avatar })
      .then(({ data }) => {
        dispatch(setLoading(true));
        if (!unMounted && data && data.ok && data.user.activated)
          dispatch(setAuth(data.user));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        toastifyErrorMessage(e?.response.data.message || e.message);
      });
  };

  if (loading)
    return (
      <section className={`${styles.cardWrapper}  ${styles.activationWrapper}`}>
        <h1 className={styles.activationHeading}>
          <img src="/images/cool.svg" alt="Cool emoji icon" />
          <span>Activation is in progress...</span>
        </h1>
        <span className={styles.warning}>
          Don't refresh the page, or activation will fail.
        </span>
        <LoaderSpinner />
      </section>
    );

  return (
    <section className={`${styles.cardWrapper}  margin_top--big`}>
      <Card heading={`Hey, ${name}`} icon={'fire'}>
        <div>
          <p className={styles.paragraph} style={{ marginBottom: '12px' }}>
            How's your avatar?
          </p>
          <Avatar image={avatar} onChange={handleAvatarChange} />
        </div>
        <Button
          onClick={handleActivateUser}
          text="Let's Go"
          disabled={loading}
        />
      </Card>
    </section>
  );
};

export default StepAvatar;
