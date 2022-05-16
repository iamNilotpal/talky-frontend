import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateUser } from '../../../api/otp-service';
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

const StepAvatar = ({ onNextClick }) => {
  const name = useSelector(selectName);
  const avatar = useSelector(selectAvatar);
  const dispatch = useDispatch();
  const [image, setImage] = useState(avatar || '/images/cool.svg');

  const handleAvatarChange = (e) => {
    const avatar = e.target.files[0];
    if (!avatar) return;
    if (avatar.size > MAX_ALLOWD_SIZE)
      return errorToast('File size bigger than 3 MB.');

    const reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  const handleActivateUser = async () => {
    try {
      const { data } = await activateUser({ name, avatar });
      if (data.ok && data.user.activated) dispatch(setAuth(data.user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={`${styles.cardWrapper} margin_top--big`}>
      <Card heading={`Hey, ${name}`} icon={'fire'}>
        <div>
          <p className={styles.paragraph} style={{ marginBottom: '8px' }}>
            How's your avatar?
          </p>
          <Avatar image={image} onChange={handleAvatarChange} />
        </div>
        <Button onClick={handleActivateUser} text="Next" />
      </Card>
    </section>
  );
};

export default StepAvatar;
