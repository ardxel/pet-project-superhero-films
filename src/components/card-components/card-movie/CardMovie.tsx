import React from 'react';
import styles from './cardMovie.module.scss';
import { upgradeRating } from 'common/tools/upgradeRating';
import toHoursAndMinutes from 'common/tools/toHoursAndMinutes';
import { Link } from 'react-router-dom';
import IMovie from 'types/Movie';

interface CardMovieProps extends IMovie {}

const CardMovie: React.FC<CardMovieProps> = ({
  kinopoiskId,
  ratingKinopoisk,
  year,
  posterUrl,
  nameOriginal,
  filmLength,
}) => {
  const [color, newRating] = upgradeRating(ratingKinopoisk);

  return (
    <li className={styles.movie}>
      <div className={styles.container}>
        <Link to={`/movie/${kinopoiskId}`}>
          <img src={posterUrl} alt={nameOriginal} />
          <div className={styles.info}>
            <span className={styles.rating} style={{ background: color }}>
              {newRating}
            </span>
            <span className={styles.year}>{year}</span>
            <span className={styles.length}>
              {toHoursAndMinutes(filmLength)}
            </span>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default CardMovie;
