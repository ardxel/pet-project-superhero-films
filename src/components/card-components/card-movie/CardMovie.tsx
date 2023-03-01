import React from 'react';
import styles from './cardMovie.module.scss';
import { upgradeRating } from 'tools/upgradeRating';
import toHoursAndMinutes from 'tools/toHoursAndMinutes';
import { Link } from 'react-router-dom';

interface CardMovieProps {
  id: number;
  rating: number;
  year: number;
  posterUrl: string;
  name: string;
  filmLength: number;
}

const CardMovie: React.FC<CardMovieProps> = ({
  id,
  rating,
  year,
  posterUrl,
  name,
  filmLength,
}) => {
  const [color, newRating] = upgradeRating(rating);

  return (
    <li className={styles.movie}>
      <div className={styles.container}>
        <Link to={`/movie/${id}`}>
          <img src={posterUrl} alt={name} />
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
