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
import { changeFavorites } from 'redux/asyncThunks/userThunks';

interface CardMovieProps extends IMovie {}

const CardMovie: React.FC<CardMovieProps> = ({ ...props }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { userState, isAuthorized } = useUserProfile();
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

  const handleToggleIsFavorite = useCallback(
    (id) => {
      sleep()
        .then(() => setIsLoading(true))
        .then(sleep.bind(null, 500))
        .then(() => {
          const value = !isFavorite;
          setIsFavorite(value);
          return value;
        })
        .then((value) => {
          return sleep(500).then(() => value);
        })
        .then((value) => {
          const type: 'add' | 'remove' = value ? 'add' : 'remove';
          const body = {
            token: userState.token,
            action: { id: id, type: type },
          };
          dispatch(changeFavorites(body));
        })
        .then(() => setIsLoading(false));
    },
    [isFavorite]
  );

  return (
    <li className={styles.movie}>
      <div
        className={styles.container}
        onMouseEnter={setIsHover.bind(null, true)}
        onMouseLeave={setIsHover.bind(null, false)}
      >
        {((isAuthorized && isHover) || isFavorite) && (
          <IconButton
            onClick={handleToggleIsFavorite.bind(null, kinopoiskId)}
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
