import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styles from './RoomCard.module.css';

const RoomCard = ({ room }) => {
  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <article
      className={styles.roomCard}
      onClick={() => history.push(`${url}/${room.id}`)}
    >
      <h3 className={styles.roomTopic}>{room.topic}</h3>
      <div className={styles.roomSpeakers}>
        <div className={styles.roomSpeakersAvatars}>
          {room.speakers.map((sp) => (
            <img
              src={sp.avatar}
              key={sp.id}
              alt="Speaker avatar"
              className={styles.roomSpeakerAvatar}
            />
          ))}
        </div>
        <div className={styles.roomSpeakersNames}>
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
