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
import Slider from '@components/slider/Slider';
import SliderCardActorList from '@components/list-components/slider-card-actor-list/SliderCardActorList';
import SliderCardMovieList from '@components/list-components/slider-card-movie-list/SliderCardMovieList';
import { Link } from 'react-router-dom';
import Description from '@pages/movie-page/description/Description';
//for(let film of document.querySelectorAll('iframe')) {console.log(film.src)}
//const videoUrls = []; for(let film of document.querySelectorAll('iframe')) {videoUrls.push(film.src)}; console.log(`\"videoUrls\": [${videoUrls.reverse().map(src => `\"${src}\"`).join(', ')}]`)const MoviePage: React.FC = () => {

const MoviePage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useGetMovieQuery({
    id: id as string,
    alternative: true,
  });
  if (isLoading || isFetching) {
    return <Loading />;
  } else if (!data) {
    return <h1>Error</h1>;
  } else {
    const { movie, alternatives } = data as MovieWithAlternativeList;
    const { actors, videoUrls } = movie;
    return (
      <main className={styles.main}>
        <HeaderMoviePage {...movie} />
        <Player urls={videoUrls} />
        <Description {...movie} />
        <Slider
          title={'Top Casts'}
          data={actors}
          DataContainerElement={SliderCardActorList}
        />
        <Slider
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
