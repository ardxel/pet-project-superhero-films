import React, { useEffect, useState } from 'react';
import styles from './ratings.module.scss';
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Rating,
  Typography,
} from '@mui/material';
import { getRating, getColor } from 'common/tools/upgradeRating';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useUserProfile from '@hooks/useUserProfile';

interface RatingsProps {
  kinopoiskId: number;
  ratingKinopoisk: number;
  imdbId: string;
  ratingImdb: number;
}

const Ratings: React.FC<RatingsProps> = ({ ...props }) => {
  const [displayModalChangeRating, setDisplayModalChangeRating] =
    useState<boolean>(false);
  const [displayModalActiveChangeRating, setDisplayModalActiveChangeRating] =
    useState<number | null>(null);
  const [myRating, setMyRating] = useState<number>(0);
  const { userState, isAuthorized, handleChangeUserCollection } =
    useUserProfile();
  const { ratingImdb, ratingKinopoisk, imdbId, kinopoiskId } = props;

  useEffect(() => {
    if (isAuthorized) {
      const matchedRating = userState.ratings.find(
        (item) => item.id === kinopoiskId
      );

      if (matchedRating) {
        setMyRating(matchedRating.value);
      }
    }
  }, [isAuthorized]);
  const handleChangeMyRating = (
    e: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value) {
      setDisplayModalChangeRating(false);
      setMyRating(value);
      const item = { id: kinopoiskId, value: value };
      console.log(item);
      handleChangeUserCollection(item, 'ratings');
    }
  };
  const handleDisplayActiveRating = (
    e: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value) {
      if (value > 0) {
        setDisplayModalActiveChangeRating(value);
      }
      if (value <= 0) {
        setDisplayModalActiveChangeRating(myRating);
      }
    }
  };

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
        <Modal
          open={displayModalChangeRating}
          onClose={() => setDisplayModalChangeRating(false)}
          disableScrollLock={true}
        >
          <Box className={styles.box}>
            <Typography component="h1">Choose your rating</Typography>
            <Rating
              defaultValue={myRating}
              max={10.0}
              precision={0.1}
              onChange={handleChangeMyRating}
              onChangeActive={handleDisplayActiveRating}
            />
            <span
              style={{
                marginTop: '5px',
                fontSize: '20px',
                minHeight: '20px',
                padding: '10px',
                borderRadius: '20px',
                backgroundColor: !displayModalActiveChangeRating
                  ? getColor(myRating)
                  : getColor(displayModalActiveChangeRating),
              }}
            >
              {!displayModalActiveChangeRating
                ? getRating(myRating)
                : getRating(displayModalActiveChangeRating)}
            </span>
          </Box>
        </Modal>
      </ButtonGroup>
    </div>
  );
};

export default Ratings;
