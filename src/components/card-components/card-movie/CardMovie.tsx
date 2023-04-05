import React, { useEffect, useMemo, useState } from 'react';
import styles from './cardMovie.module.scss';
import { getRating, upgradeRating } from '@tools/upgradeRating';
import toHoursAndMinutes from '@tools/toHoursAndMinutes';
import { Link } from 'react-router-dom';
import IMovie from '@models/Movie';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import useUserProfile from '@hooks/useUserProfile';
import CircularProgress from '@mui/material/CircularProgress';
import useMovieReview from '@hooks/useMovieReview';

interface CardMovieProps extends IMovie {}

const CardMovie: React.FC<CardMovieProps> = ({ ...props }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { userState, isAuthorized, handleChangeUserCollection, isLoading } =
    useUserProfile();
  const { isFavorite } = useMovieReview(props.kinopoiskId);
  const {
    ratingKinopoisk,
    kinopoiskId,
    posterUrl,
    nameOriginal,
    year,
    filmLength,
  } = props;
  const [color, newRating] = upgradeRating(ratingKinopoisk);

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
            onClick={handleChangeUserCollection.bind(
              null,
              kinopoiskId,
              'favorites'
            )}
            size="small"
            id="favorite-icon"
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
