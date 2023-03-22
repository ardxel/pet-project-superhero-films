import React from 'react';
import styles from './home.module.scss';
import ManualSlider from '@components/sliders/manual-slider/ManualSlider';
import franchisesList, {
  FranchiseListResponse,
} from '@constants/franchisesList';
import { useGetMoviesByFranchiseListQuery } from 'redux/api/moviesApi';
import Loading from 'common/loading/Loading';
import CardMovie from '@components/card-components/card-movie/CardMovie';

const Home: React.FC = () => {
  const { data, isLoading } = useGetMoviesByFranchiseListQuery(franchisesList);
  if (isLoading) {
    return <Loading />;
  } else
    return (
      <main className={styles.home}>
        <div className={styles.container}>
          {(data as FranchiseListResponse[]).map((franchise) => {
            const { id, title, movies } = franchise;
            return (
              <ManualSlider key={id} title={title}>
                {movies.map((movie) => (
                  <CardMovie key={movie.kinopoiskId} {...movie} />
                ))}
              </ManualSlider>
            );
          })}
        </div>
      </main>
    );
};

export default Home;
