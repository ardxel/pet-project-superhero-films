import React, { FC, useRef, PropsWithChildren } from 'react';
import styles from './manualslider.module.scss';
import superstyles from '@styles/superstyles.module.scss';
import Scroller from './scroller/Scroller';
import useScroll from '@hooks/useScroll';

interface SliderProps {
  title?: string;
  style?: React.CSSProperties;
}

const ManualSlider: FC<PropsWithChildren<SliderProps>> = ({
  title,
  children,
  style,
}) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const { isVisible, scroll } = useScroll(ulRef);

  return (
    <article
      className={styles.article}
      style={style}
      data-testid="manual-slider"
      data-type={title?.replace(' ', '-').toLowerCase()}
    >
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      <div className={styles.menu}>
        {isVisible && <Scroller {...scroll} />}
        <ul className={superstyles.list} ref={ulRef}>
          {children}
        </ul>
      </div>
    </article>
  );
};

export default ManualSlider;
