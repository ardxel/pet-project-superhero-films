import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './cardMovie.module.scss';
import { getRating, upgradeRating } from 'common/tools/upgradeRating';
import toHoursAndMinutes from 'common/tools/toHoursAndMinutes';
import { Link } from 'react-router-dom';
import IMovie from 'models/Movie';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import useUserProfile from '@hooks/useUserProfile';
import CircularProgress from '@mui/material/CircularProgress';
import { sleep } from 'common/tools';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { changeUserCollections } from 'redux/asyncThunks/userThunks';

interface CardMovieProps extends IMovie {}

const CardMovie: React.FC<CardMovieProps> = ({ ...props }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { userState, isAuthorized, userCollectionHandler } = useUserProfile();
  const {
    ratingKinopoisk,
    kinopoiskId,
    posterUrl,
    nameOriginal,
    year,
    filmLength,
  } = props;
  const [color, newRating] = upgradeRating(ratingKinopoisk);

  useEffect(() => {
    if (userState.favorites) {
      const matchedId = userState.favorites.find((id) => id === kinopoiskId);
      matchedId ? setIsFavorite(true) : setIsFavorite(false);
    }
  }, [userState.favorites]);

  const getMovieRating = useMemo(() => {
    const matchedRating = userState.ratings.find(
      (rating) => rating.id === kinopoiskId
    );
    if (matchedRating) {
      return getRating(matchedRating.value);
    } else return null;
  }, [userState.ratings]);

  return (
    <li className={styles.movie}>
      <div
        className={styles.container}
        onMouseEnter={setIsHover.bind(null, true)}
        onMouseLeave={setIsHover.bind(null, false)}
      >
        {((isAuthorized && isHover) || isFavorite) && (
          <IconButton
            onClick={userCollectionHandler.bind(null, kinopoiskId, 'favorites')}
            size="small"
            className={styles.favoriteIcon}
          >
            {isLoading && <CircularProgress size="1.3em" />}
            {!isLoading &&
              (isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />)}
          </IconButton>
        )}
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
            {getMovieRating && (
              <span
                className={styles.yourRating}
                style={{ background: 'rgb(87, 153, 239)' }}
              >
                {getMovieRating}
              </span>
            )}
          </div>
        </Link>
      </div>
    </li>
  );
};

export default CardMovie;
