import React, { useMemo } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';

const useMovieReview = (id: number) => {
  const { favorites, watchlist, ratings } = useAppSelector(
    (state) => state.user
  );

  const isFavorite = useMemo(() => {
    return favorites.includes(id);
  },[favorites]);

  const isInWatchlist = useMemo(() => {
    return watchlist.includes(id);
  }, [watchlist]);

  const isInRatings = useMemo(() => {
    return ratings.find((item) => item.id === id)
  }, [ratings])

  return { isFavorite, isInRatings, isInWatchlist };

};

export default useMovieReview;
