import React, { useEffect, useState } from 'react';
import styles from './ratings.module.scss';
import { Button, ButtonGroup } from '@mui/material';
import { getRating } from '@tools/upgradeRating';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useUserProfile from '@hooks/useUserProfile';
import { ModalChangeRating } from '@common/modals/';

interface RatingsProps {
  kinopoiskId: number;
  ratingKinopoisk: number;
  imdbId: string;
  ratingImdb: number;
}

const Ratings: React.FC<RatingsProps> = ({ ...props }) => {
  const [displayModalChangeRating, setDisplayModalChangeRating] =
    useState<boolean>(false);
  const [myRating, setMyRating] = useState<number>(0);
  const { userState, isAuthorized } =
    useUserProfile();
  const { ratingImdb, ratingKinopoisk, imdbId, kinopoiskId } = props;

  useEffect(() => {
    if (isAuthorized && userState.ratings.length !== 0) {
      const matchedRating = userState.ratings.find(
        (item) => item.id === kinopoiskId
      );

      if (matchedRating) {
        setMyRating(matchedRating.value);
      } else setMyRating(0);
    }
  }, [userState.ratings, isAuthorized]);

  return (
    <div className={styles.ratings}>
      <ButtonGroup variant='text' color='inherit' className={styles.wrapper}>
        <Button
          target='_blank'
          href={`https://www.kinopoisk.ru/film/${kinopoiskId}`}
          className={styles.bar}
        >
          <span className={styles.origin} style={{ color: '#eb4e00' }}>
            kp
          </span>
          <span className={styles.value}>{getRating(ratingKinopoisk)}</span>
        </Button>
        <Button
          target='_blank'
          href={`https://www.imdb.com/title/${imdbId}`}
          className={styles.bar}
        >
          <span className={styles.origin} style={{ color: '#f5c518' }}>
            imdb
          </span>
          <span className={styles.value}>{getRating(ratingImdb)}</span>
        </Button>
        <Button
          className={styles.bar}
          onClick={() => setDisplayModalChangeRating(true)}
        >
          <span className={styles.origin} style={{ color: '#5799EF' }}>
            Your
          </span>
          <span className={styles.myValue}>
            <BorderColorIcon />
            {getRating(myRating)}
          </span>
        </Button>
        <ModalChangeRating open={displayModalChangeRating}
                           close={setDisplayModalChangeRating.bind(null, false)}
                           id={kinopoiskId} />
      </ButtonGroup>
    </div>
  );
};

export default Ratings;
