import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import superstyles from '@styles/superstyles.module.scss';
import useUserProfile from '@hooks/useUserProfile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import useMovieReview from '@hooks/useMovieReview';
import ModalWatchlist from '@common/modalWatchlist/ModalWatchlist';

interface DescriptionButtonGroupProps {
  kinopoiskId: number;
}

const DescriptionButtonGroup: React.FC<DescriptionButtonGroupProps> = ({
  kinopoiskId,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { isAuthorized, handleChangeUserCollection } = useUserProfile();
  const { isFavorite, isInWatchlist } = useMovieReview(kinopoiskId);

  if (!isAuthorized) {
    return null;
  } else
    return (
      <>
        <ButtonGroup orientation="vertical" variant="text">
          <Button
            className={superstyles.linkButton}
            onClick={() => handleChangeUserCollection(kinopoiskId, 'favorites')}
          >
            {isFavorite && (
              <CheckCircleOutlineIcon
                sx={{ position: 'absolute', left: '15px' }}
              />
            )}
            {isFavorite ? 'In Favorites' : 'Add to Favorites'}
          </Button>
          <Button
            className={superstyles.linkButton}
            onClick={() => handleChangeUserCollection(kinopoiskId, 'watchlist')}
          >
            {isInWatchlist && (
              <CheckCircleOutlineIcon
                sx={{ position: 'absolute', left: '15px' }}
              />
            )}
            {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </Button>
          <Button
            onClick={setOpen.bind(null, true)}
            className={superstyles.linkButton}
          >
            View Watchlist
          </Button>
        </ButtonGroup>
        <ModalWatchlist open={open} closeFn={setOpen.bind(null, false)} />
      </>
    );
};

export default DescriptionButtonGroup;
