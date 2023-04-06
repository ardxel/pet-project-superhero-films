import React, { useEffect, useState } from 'react';
import useUserProfile from '@hooks/useUserProfile';

const useMovieReview = (id: number) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);
  const [isInRatings, setIsInRatings] = useState<boolean>(false);
  const { userState } = useUserProfile();

  useEffect(() => {
    const isIncludeInFavorite = userState.favorites.includes(id);
    isIncludeInFavorite ? setIsFavorite(true) : setIsFavorite(false);

    const isIncludeInWatchlist = userState.watchlist.includes(id);
    isIncludeInWatchlist ? setIsInWatchlist(true) : setIsInWatchlist(false);

    const isIncludeInRatings = userState.ratings.find((item) => item.id === id);
    isIncludeInRatings ? setIsInRatings(true) : setIsInRatings(false);

    return () => {
      null;
    };
  }, [userState.favorites, userState.watchlist, userState.ratings]);

  return { isFavorite, isInRatings, isInWatchlist, id };
};

export default useMovieReview;
