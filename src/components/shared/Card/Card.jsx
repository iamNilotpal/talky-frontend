import React from 'react';
import styles from './Card.module.css';

const Card = ({ icon, heading, iconAlt, children }) => {
  return (
    <article className={styles.card}>
      <figcaption className={styles.headingWrapper}>
        <img src={`/images/${icon}.svg`} alt={iconAlt} />
        <h1>{heading}</h1>
      </figcaption>
      {children}
    </article>
  );
};

export default Card;
