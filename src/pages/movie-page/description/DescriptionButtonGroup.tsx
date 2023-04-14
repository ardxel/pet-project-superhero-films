import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import superstyles from '@styles/superstyles.module.scss';
import useUserProfile from '@hooks/useUserProfile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import useMovieReview from '@hooks/useMovieReview';
import ModalWatchlist from '@common/modals/modalWatchlist/ModalWatchlist';
import { CircularProgress } from '@mui/material';
import { UserCollection } from '@models/User';

interface DescriptionButtonGroupProps {
  kinopoiskId: number;
}

const DescriptionButtonGroup: React.FC<DescriptionButtonGroupProps> = ({
  kinopoiskId,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { isAuthorized, handleChangeUserCollection, collectionItemLoading } =
    useUserProfile();
  const { isFavorite, isInWatchlist } = useMovieReview(kinopoiskId);


  if (!isAuthorized) {
    return null;
  } else
    return (
      <>
        <ButtonGroup orientation="vertical" variant="text">
          <Button
            className={superstyles.editButton}
            onClick={handleChangeUserCollection.bind(null, kinopoiskId, 'favorites')}
          >
            {collectionItemLoading !== 'favorites' ? (
              isFavorite && (
                <CheckCircleOutlineIcon
                  sx={{ position: 'absolute', left: '15px' }}
                />
              )
            ) : (
              <CircularProgress
                size={18}
                color={'inherit'}
                className={superstyles.load}
              />
            )}

            {isFavorite ? 'In Favorites' : 'Add to Favorites'}
          </Button>
          <Button
            className={superstyles.editButton}
            onClick={handleChangeUserCollection.bind(null, kinopoiskId, 'watchlist')}
          >
            {collectionItemLoading !== 'watchlist' ? (
              isInWatchlist && (
                <CheckCircleOutlineIcon
                  sx={{ position: 'absolute', left: '15px' }}
                />
              )
            ) : (
              <CircularProgress
                size={20}
                color={'inherit'}
                className={superstyles.load}
              />
            )}

            {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </Button>
          <Button
            onClick={setOpen.bind(null, true)}
            className={superstyles.editButton}
          >
            View Watchlist
          </Button>
        </ButtonGroup>
        <ModalWatchlist open={open} closeFn={setOpen.bind(null, false)} />
      </>
    );
};

export default DescriptionButtonGroup;
