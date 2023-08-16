import { ModalChangeRating } from '@common/modals/';
import useUserProfile from '@hooks/useUserProfile';
import IMovie from '@models/Movie';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button, ButtonGroup } from '@mui/material';
import { getRating } from '@tools/upgradeRating';
import { useEffect, useState } from 'react';
import styles from './ratings.module.scss';

interface RatingsProps extends Pick<IMovie, '_movieId' | 'ratingKinopoisk' | 'imdbId' | 'ratingImdb'> {}

const Ratings: React.FC<RatingsProps> = ({ ...props }) => {
  const [displayModalChangeRating, setDisplayModalChangeRating] = useState<boolean>(false);
  const [myRating, setMyRating] = useState<number>(0);
  const { user, isAuthorized } = useUserProfile();
  const { ratingImdb, ratingKinopoisk, imdbId, _movieId } = props;

  useEffect(() => {
    if (isAuthorized && user.ratings.length !== 0) {
      const matchedRating = user.ratings.find((item) => item.id === _movieId);

      if (matchedRating) {
        setMyRating(matchedRating.value);
      } else setMyRating(0);
    }
  }, [user.ratings, isAuthorized]);

  return (
    <div className={styles.ratings}>
      <ButtonGroup
        variant="text"
        color="inherit"
        className={styles.wrapper}>
        <Button
          target="_blank"
          href={`https://www.kinopoisk.ru/film/${_movieId}`}
          className={styles.bar}>
          <span
            className={styles.origin}
            style={{ color: '#eb4e00' }}>
            kp
          </span>
          <span className={styles.value}>{getRating(ratingKinopoisk)}</span>
        </Button>
        <Button
          target="_blank"
          href={`https://www.imdb.com/title/${imdbId}`}
          className={styles.bar}>
          <span
            className={styles.origin}
            style={{ color: '#f5c518' }}>
            imdb
          </span>
          <span className={styles.value}>{getRating(ratingImdb)}</span>
        </Button>
        <Button
          className={styles.bar}
          onClick={() => setDisplayModalChangeRating(true)}>
          <span
            className={styles.origin}
            style={{ color: '#5799EF' }}>
            Your
          </span>
          <span className={styles.myValue}>
            <BorderColorIcon />
            {getRating(myRating)}
          </span>
        </Button>
        <ModalChangeRating
          _movieId={_movieId}
          open={displayModalChangeRating}
          closeModal={setDisplayModalChangeRating.bind(null, false)}
        />
      </ButtonGroup>
    </div>
  );
};

export default Ratings;
