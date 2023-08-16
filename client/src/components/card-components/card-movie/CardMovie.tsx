import Loading from '@common/loading/Loading';
import { ModalChangeRating } from '@common/modals';
import useMovieReview from '@hooks/useMovieReview';
import useUserProfile from '@hooks/useUserProfile';
import IMovie from '@models/Movie';
import { IUser } from '@models/User';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { Button, IconButton } from '@mui/material';
import toHoursAndMinutes from '@tools/toHoursAndMinutes';
import { getColor, getRating, upgradeRating } from '@tools/upgradeRating';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './cardMovie.module.scss';

interface CardMovieProps extends IMovie {
  showRating?: boolean;
  disableFlash?: boolean;
}

const CardMovie: React.FC<CardMovieProps> = ({ ...props }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [openModalChangeRating, setOpenModalChangeRating] = useState<boolean>(false);
  const { user, isAuthorized, handleChangeUser, loadingChanges, loadingFieldChanges } = useUserProfile();
  const { ratingKinopoisk, _movieId, posterUrl, nameOriginal, year, filmLength } = props;
  const { inFavorites, inWatchlist } = useMovieReview(_movieId);
  const [color, newRating] = upgradeRating(ratingKinopoisk);

  const displayButtons = isAuthorized && isHover;

  const getMovieRating = useMemo(() => {
    const matchedRating = user.ratings.find((rating) => rating.id === _movieId);
    if (matchedRating) {
      return getRating(matchedRating.value);
    } else return null;
  }, [user.ratings]);

  const toggleWatchlistItem = () => {
    let watchlist: IUser['watchlist'] = [...user.watchlist];
    if (!inWatchlist) {
      watchlist.push(props._movieId);
    } else {
      watchlist = watchlist.filter((value) => value !== _movieId);
    }
    handleChangeUser('watchlist', watchlist);
  };

  const toggleFavoriteItem = () => {
    let favorites: IUser['favorites'] = [...user.favorites];
    if (!inFavorites) {
      favorites.push(_movieId);
    } else {
      favorites = favorites.filter((value) => value !== _movieId);
    }
    handleChangeUser('favorites', favorites);
  };

  return (
    <li className={[styles.movie, props.disableFlash ? '' : styles.movieFlash].join(' ')}>
      <div
        className={styles.container}
        onMouseEnter={setIsHover.bind(null, true)}
        onMouseLeave={setIsHover.bind(null, false)}>
        {/* element for adding movie to user collection of watchlist */}
        {(displayButtons || inWatchlist) && (
          <IconButton
            onClick={toggleWatchlistItem}
            id="watchlist-icon"
            className={styles.watchlistIcon}>
            {loadingFieldChanges !== 'watchlist' ? (
              inWatchlist ? (
                <BookmarkAddedIcon />
              ) : (
                <BookmarkAddOutlinedIcon />
              )
            ) : (
              <Loading className={styles.loading} />
            )}
          </IconButton>
        )}

        {/* element for adding movie to user collection of favorites */}
        {(displayButtons || inFavorites) && (
          <IconButton
            onClick={toggleFavoriteItem}
            id="favorite-icon"
            className={styles.favoriteIcon}>
            {loadingFieldChanges !== 'favorites' ? (
              inFavorites ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )
            ) : (
              <Loading className={styles.loading} />
            )}
          </IconButton>
        )}
        {/* show user`s rating of movie in user profile */}
        {props.showRating && (
          <div className={styles.showRating}>
            <Button
              className={styles.changeRating}
              startIcon={
                <StarIcon
                  sx={{
                    fill: getColor(+getMovieRating! as number),
                    '&:hover': { fill: color },
                  }}
                />
              }
              onClick={() => setOpenModalChangeRating(true)}>
              {getMovieRating}
            </Button>
          </div>
        )}
        {/* modal for change movie rating */}
        {props.showRating && (
          <ModalChangeRating
            open={openModalChangeRating}
            closeModal={() => setOpenModalChangeRating(false)}
            _movieId={_movieId}
          />
        )}

        <Link to={`/movie/${_movieId}`}>
          <img
            src={posterUrl}
            alt={nameOriginal}
          />
          {!props.showRating && (
            <div className={styles.info}>
              <span
                className={styles.rating}
                style={{ background: color }}>
                {newRating}
              </span>
              <span className={styles.year}>{year}</span>
              <span className={styles.length}>{toHoursAndMinutes(filmLength)}</span>
              {getMovieRating && !props.showRating && (
                <span
                  className={styles.yourRating}
                  style={{ background: 'rgb(87, 153, 239)' }}>
                  {getMovieRating}
                </span>
              )}
            </div>
          )}
        </Link>
      </div>
    </li>
  );
};

export default CardMovie;
