import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import superstyles from '@styles/superstyles.module.scss';
import useUserProfile from '@hooks/useUserProfile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import useMovieReview from '@hooks/useMovieReview';
import ModalWatchlist from '@common/modalWatchlist/ModalWatchlist';
import { CircularProgress } from '@mui/material';
import { UserCollection } from '@models/User';

interface DescriptionButtonGroupProps {
  kinopoiskId: number;
}

const DescriptionButtonGroup: React.FC<DescriptionButtonGroupProps> = ({
  kinopoiskId,
}) => {
  // when changing collections, the state is set which collection was changed for the correct isLoading
  const [collectionTypeLoading, setCollectionTypeLoading] = useState<
    keyof UserCollection | null
  >(null);
  const [open, setOpen] = useState<boolean>(false);
  const { isAuthorized, handleChangeUserCollection, isLoading } =
    useUserProfile();
  const { isFavorite, isInWatchlist } = useMovieReview(kinopoiskId);

  const changeCollection = (userColKey: keyof UserCollection) => {
    handleChangeUserCollection(kinopoiskId, userColKey);
    setCollectionTypeLoading(userColKey);
  };

  useEffect(() => {
    console.log(isLoading);
    if (!isLoading) {
      setCollectionTypeLoading(null);
    }
  }, [isLoading]);

  if (!isAuthorized) {
    return null;
  } else
    return (
      <>
        <ButtonGroup orientation="vertical" variant="text">
          <Button
            className={superstyles.editButton}
            onClick={() => changeCollection('favorites')}
          >
            {collectionTypeLoading !== 'favorites' ? (
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
            onClick={() => changeCollection('watchlist')}
          >
            {collectionTypeLoading !== 'watchlist' ? (
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
