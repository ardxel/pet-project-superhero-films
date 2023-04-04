import React from 'react';
import styles from './moviePageHeader.module.scss';
import IMovie from '@models/Movie';
import Ratings from './ratings/Ratings';
import Base from './base/Base';

interface HeaderMoviePageProps extends IMovie {}

const MoviePageHeader: React.FC<HeaderMoviePageProps> = ({ ...props }) => {
  const {
    comic,
    phase,
    year,
    ratingAgeLimits,
    ratingMpaa,
    nameRu,
    nameOriginal,
    filmLength,
    ratingImdb,
    ratingKinopoisk,
    kinopoiskId,
    imdbId,
  } = props;
  return (
    <>
      <div className={styles.path}>
        <h6>
          {comic.toUpperCase()} {phase ? `phase ${phase}` : 'comics'}{' '}
        </h6>
      </div>
      <div className={styles.header}>
        <Base
          year={year}
          ratingAgeLimits={ratingAgeLimits || ratingMpaa}
          nameRu={nameRu}
          filmLength={filmLength}
          nameOriginal={nameOriginal}
        />
        <Ratings
          ratingImdb={ratingImdb}
          ratingKinopoisk={ratingKinopoisk}
          kinopoiskId={kinopoiskId}
          imdbId={imdbId}
        />
      </div>
    </>
  );
};

export default MoviePageHeader;
