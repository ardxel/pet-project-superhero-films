import React from 'react';
import styles from './wrapper.module.scss';
import { Paper } from '@mui/material';

interface WrapperProps {
  children: React.ReactNode;
  backgroundImage?: string
  className?: string
}

const Wrapper: React.FC<WrapperProps> = ({ children, backgroundImage }) => {

  return (
    <main className={styles.main} data-testid="main-wrapper">
      <div className={styles.container}>
        {backgroundImage && (
          <div className={styles.bg}>
            <div className={styles.img} style={{backgroundImage: `url(${backgroundImage})`}}>
              <div className={styles.gradient}></div>
            </div>
          </div>
        )}
        <Paper elevation={3} sx={{ backgroundColor: 'inherit' }}>
          {children}
        </Paper>
      </div>
    </main>
  );
};

export default Wrapper;
