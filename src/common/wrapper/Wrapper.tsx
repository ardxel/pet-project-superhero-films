import React from 'react';
import styles from './wrapper.module.scss';
import { Paper } from '@mui/material';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Paper elevation={3} sx={{ backgroundColor: 'inherit' }}>
          {children}
        </Paper>
      </div>
    </main>
  );
};

export default Wrapper;
