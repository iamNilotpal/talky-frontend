import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoaderSpinner from '../../../components/Loader/Spinner/Spinner';
import Avatar from '../../../components/shared/Avatar/Avatar';
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';

import { FILE_TYPES, MAX_ALLOWED_SIZE } from '../../../constants';
import { activateUser } from '../../../services/api/otp-service';
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

const StepAvatar = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const avatar = useSelector(selectAvatar);
  const loading = useSelector(selectLoading);

  const handleAvatarChange = (e) => {
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
      dispatch(setAvatar(reader.result));
      dispatch(setLoading(false));
    };
  };

  const handleActivateUser = () => {
    dispatch(setLoading(true));
    activateUser({ name, avatar })
      .then(
        ({ data }) =>
          data.ok && data.user.activated && dispatch(setAuth(data.user))
      )
      .catch((e) =>
        toastifyErrorMessage(e?.response?.data.message || e.message)
      )
      .finally(() => dispatch(setLoading(false)));
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
