import IMovie from '@models/Movie';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './seachCarMovie.module.scss';

interface SearchCardMovieProps extends IMovie {
  setIsOpen: (arg: boolean) => void;
}

const SearchCardMovie: FC<SearchCardMovieProps> = ({ ...props }) => {
  return (
    <Link
      to={`/movie/${props._movieId}`}
      onClick={props.setIsOpen.bind(null, false)}>
      <article className={styles.item}>
        <div className={styles.itemImg}>
          <img
            src={props.posterUrl}
            alt={props.nameOriginal}
          />
        </div>
        <div className={styles.info}>
          <h6 className={styles.name}>{`${props.nameOriginal} / ${props.nameRu}`}</h6>
          <h6 className={styles.year}>{props.year}</h6>
        </div>
      </article>
    </Link>
  );
};

export default memo(SearchCardMovie);
