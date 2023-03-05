import React, { FC, useRef } from 'react';
import styles from './manualslider.module.scss';
import superstyles from '@styles/superstyles.module.scss';
import Scroller from './scroller/Scroller';
import useScroll from '@hooks/useScroll';

interface SliderProps {
  data: any[];
  title?: string;
  DataContainerElement: React.FC<{ data: any[] }>;
  style?: React.CSSProperties;
}

const ManualSlider: FC<SliderProps> = ({
  data,
  title,
  DataContainerElement,
  style,
}) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const { isVisible, scroll } = useScroll(ulRef);

  return (
    <article className={styles.article} style={style}>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      <div className={styles.menu}>
        {isVisible && <Scroller {...scroll} />}
        <ul className={superstyles.list} ref={ulRef}>
          <DataContainerElement data={data} />
        </ul>
      </div>
    </article>
  );
};

export default ManualSlider;
