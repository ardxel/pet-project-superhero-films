import React from 'react';
import styles from './home.module.scss';
import ManualSlider from '@components/sliders/manual-slider/ManualSlider';
import franchisesList, {
  FranchiseListResponse,
} from '@constants/franchisesList';
import SliderCardMovieList from '@components/list-components/slider-card-movie-list/SliderCardMovieList';
import { useGetMoviesByFranchiseListQuery } from 'redux/actions/moviesApi';
import Loading from 'common/loading/Loading';

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
              <ManualSlider
                key={id}
                data={movies}
                title={title}
                DataContainerElement={SliderCardMovieList}
              />
            );
          })}
        </div>
      </main>
    );
};

export default Home;
