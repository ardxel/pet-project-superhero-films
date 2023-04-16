import React, { useState } from 'react';
import styles from './authorization.module.scss';
import RegistrationForm from '@components/forms/registration/RegistrationForm';
import AutoSlider from '@components/sliders/auto-slider/AutoSlider';
import { Button, Paper } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LoginForm from '@components/forms/login/LoginForm';
import authAutoSliderItems from '@constants/authAutoSliderItems';
import { sleep } from '@tools/sleep';

const form = {
  REGISTRATION: 'Registration',
  LOGIN: 'Login'
};

const AuthorizationPage: React.FC<{}> = () => {
  const [displayedForm, setDisplayedForm] = useState<string>(form.REGISTRATION);
  const [testTemplate, setTestTemplate] = useState(false);
  const handleDisplayForm = () => {
    displayedForm === form.REGISTRATION
      ? setDisplayedForm(form.LOGIN)
      : setDisplayedForm(form.REGISTRATION);
  };

  const handleTestLoginSubmit = () => {
    sleep()
      .then(() => setDisplayedForm(form.LOGIN))
      .then(() => sleep(300))
      .then(() => setTestTemplate(true));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Paper elevation={5} className={styles.paper}>
          <section className={styles.slider}>
            <AutoSlider showButtons={false}>
              {authAutoSliderItems.map((item, index) => {
                const { title, image } = item;
                return (
                  <div className={styles.item} key={index}
                       data-slider='element'>
                    <div className={styles.title}>
                      <h6>{title}</h6>
                    </div>
                    <div className={styles.image}>
                      <img src={image} />
                    </div>
                  </div>
                );
              })}
            </AutoSlider>
          </section>
          <section className={styles.auth}>
            <Button className={styles.button} onClick={handleTestLoginSubmit}>
              Test account
            </Button>
            <Button
              variant='text'
              className={styles.button}
              endIcon={<NavigateNextIcon />}
              onClick={handleDisplayForm}
            >
              {displayedForm === form.REGISTRATION
                ? form.LOGIN
                : form.REGISTRATION}
            </Button>
            {displayedForm === form.REGISTRATION ? (
              <RegistrationForm />
            ) : (
              <LoginForm testTemplate={testTemplate} />
            )}
          </section>
        </Paper>
      </div>
    </main>
  );
};

export default AuthorizationPage;
