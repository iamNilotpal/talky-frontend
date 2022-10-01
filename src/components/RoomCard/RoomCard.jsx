import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectUser } from '../../store/authSlice';
import { getRandomBorder, getRandomTopBorder } from '../../utils';
import styles from './RoomCard.module.css';

const RoomCard = ({ room }) => {
  const history = useHistory();
  const user = useSelector(selectUser);
  const avatarBorder = useMemo(() => getRandomBorder(), []);
  const cardTopBorder = useMemo(() => getRandomTopBorder(), []);
  const topic =
    room.topic.length > 25
      ? room.topic.substr(0, 22).padEnd(25, '.')
      : room.topic;

  return (
    <article
      className={styles.roomCard}
      onClick={() => history.push(`/room/${room.id}`, { room })}
      style={cardTopBorder}
    >
      <h3 className={styles.roomTopic}>{topic}</h3>
      <div
        className={`${styles.roomSpeakers} ${
          room.speakers.length > 1 ? styles.multipleSpeakersAvatars : ''
        }`}
      >
        <div className={styles.roomSpeakersAvatars}>
          {room.speakers.map((sp) => (
            <img
              src={sp.avatar}
              key={sp.id}
              alt="Speaker avatar"
              className={styles.roomSpeakerAvatar}
              style={avatarBorder}
            />
          ))}
        </div>
        <div
          className={`${styles.roomSpeakersNames} ${
            room.speakers.length > 1 ? styles.multipleSpeakersNames : ''
          }`}
        >
          {room.speakers.map((sp) => (
            <p key={sp.id} className={styles.roomSpeakersName}>
              {room.owner.id === user.id ? `You (${user.name})` : sp.name}
            </p>
          ))}
        </div>
      </div>
      <p className={styles.totalPeople}>
        <span>{room.totalPeople}</span>
        <img src="/images/verified.svg" alt="User icon" />
      </p>
    </article>
  );
};

export default RoomCard;
