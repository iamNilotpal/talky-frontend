import React from 'react';
import styles from './Card.module.css';

const Card = ({ icon, heading, children }) => {
  return (
    <article className={styles.card}>
      {icon && heading && (
        <figcaption className={styles.headingWrapper}>
          <img src={`/images/${icon}.svg`} alt="" />
          <h1>{heading}</h1>
        </figcaption>
      )}
      {children}
    </article>
  );
};

export default Card;
