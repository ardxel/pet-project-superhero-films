import ReactLoading from 'react-loading';
import React from 'react';
import styles from './loading.module.scss';
import { classes } from '@tools/index';
interface LoadingProps {
  style?: React.CSSProperties;
  className?: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <div
      className={classes(styles.loading, props.className)}
      style={props.style}
      id='loading-spinner'
      data-testid="loading"
    >
      <ReactLoading type="spin" className={styles.container} />
    </div>
  );
};

export default Loading;
