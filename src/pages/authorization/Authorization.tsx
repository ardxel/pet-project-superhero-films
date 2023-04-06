import React, { useState } from 'react';
import styles from './authorization.module.scss';
import RegistrationForm from '@components/forms/registration/RegistrationForm';
import AutoSlider from '@components/sliders/auto-slider/AutoSlider';
import { Button, Paper } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LoginForm from '@components/forms/login/LoginForm';
import authAutoSliderItems from '@constants/authAutoSliderItems';

const form = {
  REGISTRATION: 'Registration',
  LOGIN: 'Login',
};

const AuthorizationPage: React.FC = () => {
  const [displayedForm, setDisplayedForm] = useState<string>(form.REGISTRATION);

  const handleDisplayForm = () => {
    displayedForm === form.REGISTRATION
      ? setDisplayedForm(form.LOGIN)
      : setDisplayedForm(form.REGISTRATION);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Paper elevation={5} className={styles.paper}>
          <section className={styles.slider}>
            <AutoSlider data={authAutoSliderItems} />
          </section>
          <section className={styles.auth}>
            <Button
              variant="text"
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
              <LoginForm />
            )}
          </section>
        </Paper>
      </div>
    </main>
  );
};

export default AuthorizationPage;
