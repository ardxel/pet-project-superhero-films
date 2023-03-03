import React from 'react';
import styles from './scroller.module.scss';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type FnVoid = () => void;

interface ScrollerProps {
  left: FnVoid;
  right: FnVoid;
  stop: FnVoid;
}

const Scroller: React.FC<ScrollerProps> = ({ left, right, stop }) => {
  return (
    <>
      <div className={styles.left} aria-label="scroller">
        <Button onMouseDown={left} onMouseUp={stop} onMouseOut={stop}>
          <ArrowBackIosNewIcon />
        </Button>
      </div>
      <div className={styles.right} aria-label="scroller">
        <Button onMouseDown={right} onMouseUp={stop} onMouseOut={stop}>
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </>
  );
};

export default Scroller;
