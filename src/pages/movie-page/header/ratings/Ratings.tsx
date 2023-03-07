import React from 'react';
import styles from './ratings.module.scss';
import { Button, ButtonGroup } from '@mui/material';
import { getRating } from 'common/tools/upgradeRating';
import BorderColorIcon from '@mui/icons-material/BorderColor';

interface RatingsProps {
  kinopoiskId: number;
  ratingKinopoisk: number;
  imdbId: string;
  ratingImdb: number;
}

const Ratings: React.FC<RatingsProps> = ({
  kinopoiskId,
  ratingKinopoisk,
  imdbId,
  ratingImdb,
}) => {
  return (
    <div className={styles.ratings}>
      <ButtonGroup variant="text" color="inherit" className={styles.wrapper}>
        <Button
          target="_blank"
          href={`https://www.kinopoisk.ru/film/${kinopoiskId}`}
          className={styles.bar}
        >
          <span className={styles.origin} style={{ color: '#eb4e00' }}>
            kp
          </span>
          <span className={styles.value}>{getRating(ratingKinopoisk)}</span>
        </Button>
        <Button
          target="_blank"
          href={`https://www.imdb.com/title/${imdbId}`}
          className={styles.bar}
        >
          <span className={styles.origin} style={{ color: '#f5c518' }}>
            imdb
          </span>
          <span className={styles.value}>{getRating(ratingImdb)}</span>
        </Button>
        <Button target="_blank" href={'/'} className={styles.bar}>
          <span className={styles.origin} style={{ color: '#5799EF' }}>
            Your
          </span>
          <span className={styles.myValue}>
            <BorderColorIcon />
            0.0
          </span>
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Ratings;
