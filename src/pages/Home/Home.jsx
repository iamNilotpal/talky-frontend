import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import { Redirect } from 'react-router-dom';

const Home = () => {
  const [toRegister, setToRegister] = useState(false);

  if (toRegister) return <Redirect to="/register" />;

  return (
    <Card heading={'Welcome To Talky!'} icon="logo192" iconAlt="Logo">
      <p>
        We’re working hard to get Talky ready for everyone! While we wrap up the
        finishing youches, we’re adding people gradually to make sure nothing
        breaks :)
      </p>

      <div className={styles.buttonWrapper}>
        <Button
          text="Get Your Username"
          icon="arrow"
          iconAlt="Arrow icon"
          onClick={() => setToRegister(true)}
        />
        <div className={styles.inviteWrapper}>
          <span>Have an invite text?</span>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </Card>
  );
};

export default Home;
