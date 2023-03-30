import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import superstyles from '@styles/superstyles.module.scss';
import useUserProfile from '@hooks/useUserProfile';
import { useAppSelector } from '@hooks/useAppSelector';

interface DescriptionButtonGroupProps {
  kinopoiskId: number;
}

const DescriptionButtonGroup: React.FC<DescriptionButtonGroupProps> = ({
  kinopoiskId,
}) => {
  const { isAuthorized, handleChangeUserCollection } = useUserProfile();
  const userState = useAppSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);

  useEffect(() => {
    const isIncludeInFavorite = userState.favorites.includes(kinopoiskId);
    isIncludeInFavorite ? setIsFavorite(true) : setIsFavorite(false);

    const isIncludeInWatchlist = userState.watchlist.includes(kinopoiskId);
    isIncludeInWatchlist ? setIsInWatchlist(true) : setIsInWatchlist(false);
  }, [userState.favorites, userState.watchlist, kinopoiskId]);

  if (!isAuthorized) {
    return null;
  } else
    return (
      <ButtonGroup orientation="vertical" variant="text">
        <Button
          className={superstyles.linkButton}
          onClick={() => handleChangeUserCollection(kinopoiskId, 'favorites')}
        >
          {isFavorite ? 'In Favorites' : 'Add to Favorites'}
        </Button>
        <Button
          className={superstyles.linkButton}
          onClick={() => handleChangeUserCollection(kinopoiskId, 'watchlist')}
        >
          {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
        </Button>
        <Button className={superstyles.linkButton}>View Watchlist</Button>
      </ButtonGroup>
    );
};

export default DescriptionButtonGroup;
