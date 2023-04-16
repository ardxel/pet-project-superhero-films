import React, { useMemo, useState } from 'react';
import styles from './cardMovie.module.scss';
import { getColor, getRating, upgradeRating } from '@tools/upgradeRating';
import toHoursAndMinutes from '@tools/toHoursAndMinutes';
import { Link } from 'react-router-dom';
import IMovie from '@models/Movie';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, IconButton } from '@mui/material';
import useUserProfile from '@hooks/useUserProfile';
import useMovieReview from '@hooks/useMovieReview';
import Loading from '@common/loading/Loading';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { UserCollection } from '@models/User';
import StarIcon from '@mui/icons-material/Star';
import { ModalChangeRating } from '@common/modals';

interface CardMovieProps extends IMovie {
  showRating?: boolean;
  disableFlash?: boolean
}

const CardMovie: React.FC<CardMovieProps> = ({ ...props }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [openModalChangeRating, setOpenModalChangeRating] = useState<boolean>(false);
  const {
    userState,
    isAuthorized,
    handleChangeUserCollection,
    collectionItemLoading
  } = useUserProfile();
  const {
    ratingKinopoisk,
    kinopoiskId,
    posterUrl,
    nameOriginal,
    year,
    filmLength
  } = props;

  const { isFavorite, isInWatchlist } = useMovieReview(props.kinopoiskId);
  const [color, newRating] = upgradeRating(ratingKinopoisk);
  const displayButtons = isAuthorized && isHover;
  const getMovieRating = useMemo(() => {
    const matchedRating = userState.ratings.find(
      (rating) => rating.id === kinopoiskId
    );

    if (matchedRating) {
      return getRating(matchedRating.value);
    } else return null;
  }, [userState.ratings]);

  const toggleCollectionItem = (key: keyof UserCollection): void => {
    handleChangeUserCollection(kinopoiskId, key);
  };

  return (
    <li className={[styles.movie, (props.disableFlash ? '': styles.movieFlash)].join(' ')}>
      <div
        className={styles.container}
        onMouseEnter={setIsHover.bind(null, true)}
        onMouseLeave={setIsHover.bind(null, false)}
      >
        {/* element for adding movie to user collection of watchlist */}
        {(displayButtons || isInWatchlist) && (
          <IconButton
            onClick={toggleCollectionItem.bind(null, 'watchlist')}
            id='watchlist-icon'
            className={styles.watchlistIcon}>
            {collectionItemLoading !== 'watchlist'
              ? (isInWatchlist ? <BookmarkAddedIcon  /> : <BookmarkAddOutlinedIcon />)
              : <Loading className={styles.loading} />}
          </IconButton>)}

        {/* element for adding movie to user collection of favorites */}
        {(displayButtons || isFavorite) && (
          <IconButton
            onClick={toggleCollectionItem.bind(null, 'favorites')}
            id='favorite-icon'
            className={styles.favoriteIcon}>
            {collectionItemLoading !== 'favorites'
              ? (isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />)
              : (
                <Loading className={styles.loading} />
              )}
          </IconButton>
        )}
        {/* show user`s rating of movie in user profile */}
        {props.showRating && (
          <div className={styles.showRating}>
            <Button className={styles.changeRating}
                    startIcon={<StarIcon sx={{
                      fill: getColor(+getMovieRating! as number),
                      '&:hover': { fill: color }
                    }} />}
                    onClick={setOpenModalChangeRating.bind(null, true)}>
              {getMovieRating}
            </Button>
          </div>
        )}
        {/* modal for change movie rating */}
        {props.showRating && <ModalChangeRating open={openModalChangeRating}
                                                close={setOpenModalChangeRating.bind(null, false)}
                                                id={kinopoiskId} />}

        <Link to={`/movie/${kinopoiskId}`}>
          <img src={posterUrl} alt={nameOriginal} />
          {!props.showRating && <div className={styles.info}>
            <span className={styles.rating} style={{ background: color }}>
              {newRating}
            </span>
            <span className={styles.year}>{year}</span>
            <span className={styles.length}>
              {toHoursAndMinutes(filmLength)}
            </span>
            {getMovieRating && !props.showRating && (
              <span
                className={styles.yourRating}
                style={{ background: 'rgb(87, 153, 239)' }}
              >
                {getMovieRating}
              </span>
            )}
          </div>}
        </Link>
      </div>
    </li>
  );
};

export default CardMovie;
