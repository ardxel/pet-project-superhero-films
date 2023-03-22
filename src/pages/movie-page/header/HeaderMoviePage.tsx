import React from 'react';
import styles from '@pages/movie-page/header/headerMoviePage.module.scss';
import IMovie from 'models/Movie';
import Ratings from './ratings/Ratings';
import Base from './base/Base';

interface HeaderMoviePageProps extends IMovie {}

const HeaderMoviePage: React.FC<HeaderMoviePageProps> = ({
  comic,
  phase,
  kinopoiskId,
  imdbId,
  nameOriginal,
  nameRu,
  year,
  filmLength,
  ratingAgeLimits,
  ratingMpaa,
  ratingKinopoisk,
  ratingImdb,
}) => {
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

export default HeaderMoviePage;
