import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '../../components/shared/Button/Button';
import Card from '../../components/shared/Card/Card';
import styles from './Home.module.css';

const Home = () => {
  const [toRegister, setToRegister] = useState(false);

  if (toRegister) return <Redirect to="/authenticate" />;

  return (
    <section className={styles.cardWrapper}>
      <Card heading={'Welcome To Talky!'} icon="logo192" iconAlt="Logo">
        <p className={styles.paragraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          dolores ad odit ipsum! Et, accusantium non quis aliquid, cumque
          voluptate voluptatum! :)
        </p>

        <div className={styles.buttonWrapper}>
          <Button
            text="Let's Get Started"
            onClick={() => setToRegister(true)}
          />
        </div>
      </Card>
    </section>
  );
};

export default Home;
