import { Box, Modal } from '@mui/material';
import styles from './modalWatchlist.module.scss';
import Loading from '@common/loading/Loading';
import CardWatchlistMovie
  from '@components/card-components/car-movie-watchlist/CardWatchlistMovie';
import React, { FC, useEffect } from 'react';
import { useLazyGetMoviesByIdsQuery } from '@reduxproj//api/moviesApi';
import useUserProfile from '@hooks/useUserProfile';
import { disableScroll, enableScroll } from '@tools/scroll-lock';

type ModalWatchlistProps = {
  open: boolean;
  closeFn: () => void;
};

const ModalWatchlist: FC<ModalWatchlistProps> = ({ open, closeFn }) => {
  const [fetchMovies, moviesResponse] = useLazyGetMoviesByIdsQuery();
  const { userState } = useUserProfile();

  useEffect(() => {
    if (open && !moviesResponse.data) {
      fetchMovies(userState.watchlist);
      disableScroll();
    }

    if (!open) {
      enableScroll();
    }
  }, [open]);

  if (!open) return null;

  if (moviesResponse.isLoading) return <Loading />;
  return (
    <Modal open={open} onClose={closeFn} disableScrollLock={true}>
      <Box className={styles.box}>
        {moviesResponse.isLoading && <Loading />}
        {userState.watchlist.length > 0 ? (
          moviesResponse.data &&
          moviesResponse.data.map((item) => {
            return (
              <CardWatchlistMovie key={item.id} {...item} closeFn={closeFn} />
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
