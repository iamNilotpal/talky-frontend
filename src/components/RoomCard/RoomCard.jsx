import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { getRandomBorder, getRandomTopBorder } from '../../utils';
import styles from './RoomCard.module.css';

const RoomCard = ({ room }) => {
  const history = useHistory();
  const topic =
    room.topic.length > 35
      ? room.topic.substr(0, 32).padEnd(35, '.')
      : room.topic;
  const cardTopBorder = useMemo(() => getRandomTopBorder(), []);
  const avatarBorder = useMemo(() => getRandomBorder(), []);

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
              {sp.name}
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
