import useMovieReview from '@hooks/useMovieReview';
import useUserProfile from '@hooks/useUserProfile';
import IMovie from '@models/Movie';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { IconButton, Link } from '@mui/material';
import { formatAgeLimits } from '@tools/index';
import toHoursAndMinutes from '@tools/toHoursAndMinutes';
import { Link as RouterLink } from 'react-router-dom/';
import styles from './cardWatchlistMovie.module.scss';

interface CardMovieFavoriteProps extends IMovie {
  closeFn: () => void;
}

const CardWatchlistMovie: React.FC<CardMovieFavoriteProps> = ({ ...props }) => {
  const { handleChangeUser, user } = useUserProfile();
  const { inWatchlist } = useMovieReview(props._movieId);

  const handleChangeWatchlist = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    let watchlist = [...user.watchlist];
    if (inWatchlist) {
      watchlist = watchlist.filter((value) => value !== props._movieId);
    } else {
      watchlist.push(props._movieId);
    }
    handleChangeUser('watchlist', watchlist);
  };

  if (!inWatchlist) {
    return null;
  } else
    return (
      <div className={styles.favorite}>
        <RouterLink
          to={`/movie/${props._movieId}`}
          onClick={props.closeFn}
          className={styles.img}>
          <img
            src={props.posterUrl}
            alt={props.nameOriginal}
          />
          <IconButton
            onClick={handleChangeWatchlist}
            className={styles.bookmark}>
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
                  href={`https://www.imdb.com/name/${actor.id}/`}>
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
