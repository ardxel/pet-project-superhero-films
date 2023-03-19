import React, { useEffect, useState } from 'react';
import styles from './formtitle.module.scss';
import { Alert, AlertColor, AlertTitle } from '@mui/material';
import { sleep } from 'common/tools';

interface FormTitleProps {
  title: string;
  showAlert: boolean;
  severity: AlertColor | undefined;
  message: string | undefined;
}

const FormTitle: React.FC<FormTitleProps> = ({
  title,
  showAlert,
  severity,
  message,
}) => {
  const [showAlertMessage, setShowAlertMessage] = useState(true);
  useEffect(() => {
    if (showAlert) {
      sleep(5000).then(() => setShowAlertMessage(false));
    }
  }, [showAlert]);

  if ((!showAlert && showAlertMessage) || (showAlert && !showAlertMessage)) {
    return (
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
    );
  } else
    return (
      <div className={styles.title}>
        <h3>{title}</h3>
        <Alert className={styles.alert} severity={severity}>
          <AlertTitle>{severity}</AlertTitle>
          {message}
        </Alert>
      </div>
    );
};

export default FormTitle;
