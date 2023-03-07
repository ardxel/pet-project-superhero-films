import React from 'react';
import styles from './MoviePage.module.scss';
import Player from '@components/player/Player';
import { useParams } from 'react-router';
import Loading from 'common/loading/Loading';
import HeaderMoviePage from './header/HeaderMoviePage';
import {
  MovieWithAlternativeList,
  useGetMovieQuery,
} from 'redux/actions/moviesApi';
import ManualSlider from '@components/sliders/manual-slider/ManualSlider';
import SliderCardActorList from '@components/list-components/slider-card-actor-list/SliderCardActorList';
import SliderCardMovieList from '@components/list-components/slider-card-movie-list/SliderCardMovieList';
import Description from '@pages/movie-page/description/Description';

const MoviePage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMovieQuery({
    id: id as string,
    alternative: true,
  });
  if (isLoading) {
    return <Loading />;
  } else if (!data) {
    return <h1>Error</h1>;
  } else {
    const { movie, alternatives } = data as MovieWithAlternativeList;
    return (
      <main className={styles.main}>
        <HeaderMoviePage {...movie} />
        <Player urls={movie.videoUrls} />
        <Description {...movie} />
        <ManualSlider
          title={'Top Casts'}
          data={movie.actors}
          DataContainerElement={SliderCardActorList}
        />
        <ManualSlider
          style={{ marginTop: '3em', marginBottom: '3em' }}
          title={'More Like this'}
          data={alternatives}
          DataContainerElement={SliderCardMovieList}
        />
      </main>
    );
  }
};

export default MoviePage;
