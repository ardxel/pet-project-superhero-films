import ReactLoading from 'react-loading';
import React from 'react';
import styles from './loading.module.scss';
interface LoadingProps {
  style?: React.CSSProperties;
  className?: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <div
      className={[props.className, styles.loading].join(' ')}
      style={props.style}
      data-testid="loading"
    >
      <ReactLoading type="spin" className={styles.container} />
    </div>
  );
};

export default Loading;
