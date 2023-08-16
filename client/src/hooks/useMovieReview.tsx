import { useAppSelector } from '@hooks/useAppSelector';
import { useMemo } from 'react';

const useMovieReview = (id: number) => {
  const { favorites, watchlist, ratings } = useAppSelector((state) => state.user.user);

  const inFavorites = useMemo(() => {
    return favorites.includes(id);
  }, [favorites]);

  const inWatchlist = useMemo(() => {
    return watchlist.includes(id);
  }, [watchlist]);

  const inRatings = useMemo(() => {
    return ratings.find((item) => item.id === id);
  }, [ratings]);

  return { inRatings, inFavorites, inWatchlist };
};

export default useMovieReview;
