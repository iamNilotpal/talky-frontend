import React from 'react';
import styles from './Card.module.css';

const Card = ({ icon, heading, iconAlt, children }) => {
  return (
    <section className={styles.cardWrapper}>
      <article className={styles.card}>
        <figcaption className={styles.headingWrapper}>
          <img src={`/${icon}.png`} alt={iconAlt} />
          <h1>{heading}</h1>
        </figcaption>
        {children}
      </article>
    </section>
  );
};

export default Card;
