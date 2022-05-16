import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateUser } from '../../../api/otp-service';
import LoaderSpinner from '../../../components/Loader/Spinner/Spinner';
import Avatar from '../../../components/shared/Avatar/Avatar';
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import {
  selectAvatar,
  selectName,
  setAvatar,
} from '../../../store/activateSlice';
import { setAuth } from '../../../store/authSlice';
import { errorToast } from '../../../utils';
import styles from './StepAvatar.module.css';
const MAX_ALLOWD_SIZE = 3 * 1024 * 1024; // 3 MB
const fileTypes = ['image/png', 'image/gif', 'image/jpeg'];

const StepAvatar = () => {
  const name = useSelector(selectName);
  const avatar = useSelector(selectAvatar);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    const image = e.target.files[0];
    if (!image) return;

    if (!fileTypes.includes(image.type))
      return errorToast('Only PNG and JPEG files are allowed.');

    if (image.size > MAX_ALLOWD_SIZE)
      return errorToast('File size bigger than 3 MB.');

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => dispatch(setAvatar(reader.result));
  };

  const handleActivateUser = () => {
    setLoading(true);
    activateUser({ name, avatar: avatar })
      .then(({ data }) => {
        setLoading(false);
        if (data && data.ok && data.user.activated)
          dispatch(setAuth(data.user));
      })
      .catch(({ response }) => {
        setLoading(false);
        errorToast(response.data.message);
      });
  };

  if (loading)
    return (
      <section className={`${styles.cardWrapper} margin_top--big`}>
        <Card heading="Activation in progress..." icon="cool">
          <span className={styles.warning}>
            Don't refresh the page, or activation will fail.
          </span>
          <LoaderSpinner />
        </Card>
      </section>
    );

  return (
    <section className={`${styles.cardWrapper} margin_top--big`}>
      <Card heading={`Hey, ${name}`} icon={'fire'}>
        <div>
          <p className={styles.paragraph} style={{ marginBottom: '8px' }}>
            How's your avatar?
          </p>
          <Avatar image={avatar} onChange={handleAvatarChange} />
        </div>
        <Button onClick={handleActivateUser} text="Next" />
      </Card>
    </section>
  );
};

export default StepAvatar;
