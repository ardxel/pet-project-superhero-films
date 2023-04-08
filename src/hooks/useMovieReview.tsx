import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';

const useMovieReview = (id: number) => {
  const { favorites, watchlist, ratings } = useAppSelector(
    (state) => state.user
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);
  const [isInRatings, setIsInRatings] = useState<boolean>(false);

  useEffect(() => {
    const isIncludeInFavorite = favorites.includes(id);
    isIncludeInFavorite ? setIsFavorite(true) : setIsFavorite(false);

    const isIncludeInWatchlist = watchlist.includes(id);
    isIncludeInWatchlist ? setIsInWatchlist(true) : setIsInWatchlist(false);

    const isIncludeInRatings = ratings.find((item) => item.id === id);
    isIncludeInRatings ? setIsInRatings(true) : setIsInRatings(false);
  }, [favorites, watchlist, ratings]);

  return { isFavorite, isInRatings, isInWatchlist };
};

export default useMovieReview;
