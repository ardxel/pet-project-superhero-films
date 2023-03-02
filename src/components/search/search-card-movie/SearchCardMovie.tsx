import React, { FC } from 'react';
import styles from './seachCarMovie.module.scss';
import { Link } from 'react-router-dom';

interface SearchCardMovieProps {
  id: number;
  name: string;
  poster: string;
  year: number;
  setIsOpen: (arg: boolean) => void;
}

const SearchCardMovie: FC<SearchCardMovieProps> = ({
  id,
  name,
  poster,
  year,
  setIsOpen,
}) => {
  return (
    <Link to={`/movie/${id}`} onClick={() => setIsOpen(false)}>
      <article className={styles.item}>
        <div className={styles.itemImg}>
          <img src={poster} alt={name} />
        </div>
        <div className={styles.info}>
          <h6 className={styles.name}>{name}</h6>
          <h6 className={styles.year}>{year}</h6>
        </div>
      </article>
    </Link>
  );
};

export default SearchCardMovie;
