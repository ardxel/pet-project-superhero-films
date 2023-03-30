import React from 'react';
import Player from '@components/player/Player';
import { useParams } from 'react-router';
import Loading from 'common/loading/Loading';
import HeaderMoviePage from './header/MoviePageHeader';
import Wrapper from 'common/wrapper/Wrapper';
import {
  MovieWithAlternativeList,
  useGetMovieQuery,
} from 'redux/api/moviesApi';
import ManualSlider from '@components/sliders/manual-slider/ManualSlider';
import DescriptionMoviePage from '@pages/movie-page/description/DescriptionMoviePage';
import CardActor from '@components/card-components/card-actor/CardActor';
import CardMovie from '@components/card-components/card-movie/CardMovie';

const MoviePage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMovieQuery({
    id: id as string,
    alternative: true,
  });
  if (isLoading) {
    return <Loading style={{ width: '25%' }} />;
  } else if (!data) {
    return <h1>Error</h1>;
  } else {
    const { movie, alternatives } = data as MovieWithAlternativeList;
    return (
      <Wrapper>
        <HeaderMoviePage {...movie} />
        <Player sources={movie.videoUrls} />
        <DescriptionMoviePage {...movie} />
        <ManualSlider title={'Top Casts'} style={{ marginTop: '3em' }}>
          {movie.actors.map((actor) => (
            <CardActor key={actor.id} {...actor} />
          ))}
        </ManualSlider>
        <ManualSlider
          style={{ marginTop: '3em', marginBottom: '3em' }}
          title={'More Like this'}
        >
          {alternatives.map((altMovie, index) => (
            <CardMovie key={index} {...altMovie} />
          ))}
        </ManualSlider>
      </Wrapper>
    );
  }
};

export default MoviePage;
