import ReactLoading from 'react-loading';
import React from 'react';
import styles from './loading.module.scss';
interface LoadingProps {
  width?: string | number;
  height?: string | number;
}
const Loading: React.FC<LoadingProps> = ({ width, height }) => {
  return (
    <div className={styles.loading} style={{ width: width, height: height }}>
      <ReactLoading type="spin" className={styles.container} />
    </div>
  );
};

export default Loading;
