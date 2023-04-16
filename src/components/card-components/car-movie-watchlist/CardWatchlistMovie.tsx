import React from 'react';
import styles from './cardWatchlistMovie.module.scss';
import IMovie from '@models/Movie';
import toHoursAndMinutes from '@tools/toHoursAndMinutes';
import useUserProfile from '@hooks/useUserProfile';
import { IconButton, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom/';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import useMovieReview from '@hooks/useMovieReview';
import { formatAgeLimits } from '@tools/index';

interface CardMovieFavoriteProps extends IMovie {
  closeFn: () => void;
}

const CardWatchlistMovie: React.FC<CardMovieFavoriteProps> = ({ ...props }) => {
  const { handleChangeUserCollection } = useUserProfile();
  const { isInWatchlist } = useMovieReview(props.kinopoiskId);

  const handleChangeWatchlist = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    handleChangeUserCollection(props.kinopoiskId, 'watchlist');
  };

  if (!isInWatchlist) {
    return null;
  } else
    return (
      <div className={styles.favorite}>
        <RouterLink
          to={`/movie/${props.kinopoiskId}`}
          onClick={props.closeFn}
          className={styles.img}
        >
          <img src={props.posterUrl} alt={props.nameOriginal} />
          <IconButton
            onClick={handleChangeWatchlist}
            className={styles.bookmark}
          >
            <TurnedInIcon />
          </IconButton>
        </RouterLink>
        <div className={styles.info}>
          <h3 className={styles.name}>
            {props.nameOriginal}/{props.nameRu}
          </h3>
          <p className={styles.details}>
            <span>{props.year}</span>
            <span>{toHoursAndMinutes(props.filmLength)}</span>
            <span>{formatAgeLimits(props.ratingAgeLimits || props.ratingMpaa)}</span>
          </p>
          <div className={styles.ratings}>
            <div className={styles.kp}>{props.ratingKinopoisk}</div>
            <div className={styles.imdb}>{props.ratingImdb}</div>
            <div className={styles.myR}></div>
          </div>
          <div className={styles.actors}>
            {props.actors.slice(0, 4).map((actor) => {
              return (
                <Link
                  key={actor.id}
                  underline="always"
                  href={`https://www.imdb.com/name/${actor.id}/`}
                >
                  {actor.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
};

export default CardWatchlistMovie;
