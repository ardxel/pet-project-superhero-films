import React, { FC, useRef } from 'react';
import styles from './slider.module.scss';
import Scroller from './scroller/Scroller';
import useScroll from '@hooks/useScroll';

interface SliderProps {
  data: any[];
  title?: string;
  DataContainerElement: React.FC<any>;
}

const Slider: FC<SliderProps> = ({ data, title, DataContainerElement }) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const { isVisible, scroll } = useScroll(ulRef);

  return (
    <article className={styles.article}>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      <div className={styles.menu}>
        {isVisible && <Scroller {...scroll} />}
        <ul className={styles.list} ref={ulRef}>
          {/* container elements must be inside the LI tag and be inline blocks */}
          <DataContainerElement data={data} />
        </ul>
      </div>
    </article>
  );
};

export default Slider;
