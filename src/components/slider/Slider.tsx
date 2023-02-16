import React, {
  useRef,
  memo,
} from 'react';
import styles from './slider.module.scss';
import CardMovie from '../card-movie/CardMovie';
import { useGetFranchiseQuery } from 'redux/actions/moviesApi';
import { ArrowSVG } from '@images/index';
import useScroll from '@hooks/useScroll';

function Slider({ title }: { title: string }) {
  const { data = [], isLoading } = useGetFranchiseQuery(title);
  const ulRef = useRef<HTMLUListElement>(null);
  const { isVisible, scroll } = useScroll(ulRef);

  return (
    <article
      className={styles.article}>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      <div className={styles.menu}>
        {isVisible && <>
          <button className={styles.left}
                  onMouseDown={scroll.left}
                  onMouseUp={scroll.stop}>
            <div className={styles.svgWrapper}>
              <ArrowSVG />
            </div>
          </button>
          <button className={styles.right}
                  onMouseDown={scroll.right}
                  onMouseUp={scroll.stop}>
            <div className={styles.svgWrapper}>
              <ArrowSVG />
            </div>
          </button>
        </>}
        <ul className={styles.list} ref={ulRef}>
          {data.map(movie => {
            const {
              kinopoiskId,
              ratingKinopoisk,
              year,
              posterUrl,
              nameOriginal
            } = movie;
            return (
              <CardMovie
                key={kinopoiskId}
                rating={ratingKinopoisk}
                year={year}
                posterUrl={posterUrl}
                name={nameOriginal} />);
          })}
        </ul>
      </div>
    </article>
  );
}

export default memo(Slider);