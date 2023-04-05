import React, { memo, useCallback, useEffect, useState } from 'react';
import styles from './formtitle.module.scss';
import { Alert, AlertColor, AlertTitle } from '@mui/material';

interface FormTitleProps {
  title?: string;
  showAlert?: boolean;
  severity?: AlertColor | undefined;
  message?: string | undefined;
}

const FormTitle: React.FC<FormTitleProps> = ({ ...props }) => {
  const { showAlert, severity, title, message } = props;
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  useEffect(() => {
    if (showAlert) {
      handleShowAlertMessage();
    }
    let alertTimeout = setTimeout(handleHideAlertMessage, 3000);
    return () => {
      clearTimeout(alertTimeout);
    };
  }, [showAlert]);

  const handleShowAlertMessage = useCallback(() => {
    setShowAlertMessage(true);
  }, [showAlertMessage]);

  const handleHideAlertMessage = useCallback(() => {
    setShowAlertMessage(false);
  }, [showAlertMessage]);

  if (!title) {
    return null;
  } else
    return (
      <div className={styles.title} data-testid="title-form-edit-profile">
        <h3>{title}</h3>
        {showAlertMessage && (
          <Alert className={styles.alert} severity={severity}>
            <AlertTitle>{severity}</AlertTitle>
            {message}
          </Alert>
        )}
      </div>
    );
};

export default memo(FormTitle);
