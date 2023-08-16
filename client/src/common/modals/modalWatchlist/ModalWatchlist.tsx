import Loading from '@common/loading/Loading';
import CardWatchlistMovie from '@components/card-components/car-movie-watchlist/CardWatchlistMovie';
import { useLazyFetch } from '@hooks/useFetch';
import useUserProfile from '@hooks/useUserProfile';
import { Box, Modal } from '@mui/material';
import { fetchMoviesByIds } from '@reduxproj/api/movie.api';
import { disableScroll, enableScroll } from '@tools/scroll-lock';
import { FC, useEffect } from 'react';
import styles from './modalWatchlist.module.scss';

type ModalWatchlistProps = {
  open: boolean;
  closeFn: () => void;
};

const ModalWatchlist: FC<ModalWatchlistProps> = ({ open, closeFn }) => {
  const [fetchMovies, moviesResponse] = useLazyFetch(fetchMoviesByIds);
  const { user } = useUserProfile();
  useEffect(() => {
    if (open && !moviesResponse.data) {
      fetchMovies(user.watchlist);
      disableScroll();
    }

    if (!open) {
      enableScroll();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  if (moviesResponse.isLoading) {
    return <Loading />;
  }
  return (
    <Modal
      open={open}
      onClose={closeFn}
      disableScrollLock={true}>
      <Box className={styles.box}>
        {moviesResponse.isLoading && <Loading />}
        {user.watchlist.length > 0 ? (
          moviesResponse.data &&
          moviesResponse.data?.movies.map((item) => {
            return (
              <CardWatchlistMovie
                key={item._dbId}
                {...item}
                closeFn={closeFn}
              />
            );
          })
        ) : (
          <h1 style={{ color: 'var(--color13)' }}>List is empty</h1>
        )}
      </Box>
    </Modal>
  );
};

export default ModalWatchlist;
