import React from 'react';
import Card from '../../../components/shared/Card/Card';
import styles from './Activating.module.css';

const Activating = () => {
  return (
    <section className={styles.cardWrapper}>
      <Card heading="Activating your account" icon="fire">
        <p className={styles.paragraph}>
          Spoiler alert: Progress Bar yet to implement.
        </p>
      </Card>
    </section>
  );
};

export default Activating;
