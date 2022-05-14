import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import { Redirect } from 'react-router-dom';

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
            icon="arrow"
            iconAlt="Arrow icon"
            onClick={() => setToRegister(true)}
          />
          <div className={styles.inviteWrapper}>
            <span>Have an invite text?</span>
            <Link to="/authenticate">Sign In</Link>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Home;
