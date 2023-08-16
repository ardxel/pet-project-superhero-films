import Loading from '@common/loading/Loading';
import Wrapper from '@common/wrapper/Wrapper';
import CardActor from '@components/card-components/card-actor/CardActor';
import CardMovie from '@components/card-components/card-movie/CardMovie';
import Player from '@components/player/Player';
import ManualSlider from '@components/sliders/manual-slider/ManualSlider';
import IMovie from '@models/Movie';
import DescriptionMoviePage from '@pages/movie-page/description/DescriptionMoviePage';
import { fetchMovieById } from '@reduxproj/api/movie.api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderMoviePage from './header/MoviePageHeader';

const MoviePage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [comicMovies, setComicMovies] = useState<IMovie[] | null>(null);
  const [franchiseMovies, setFranchiseMovies] = useState<IMovie[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isComicMovies = Boolean(comicMovies && comicMovies.length > 0);
  const isFranchiseMovies = Boolean(franchiseMovies && franchiseMovies.length > 0);

  useEffect(() => {
    if (id) {
      Promise.resolve(setIsLoading(true))
        .then(() => fetchMovieById(Number(id)))
        .then((data) => {
          setMovie(data?.movie as IMovie);
          setComicMovies(data?.comicMovies as IMovie[]);
          setFranchiseMovies(data?.franchiseMovies as IMovie[]);
        })
        .catch((error) => {
          console.log(error);
          navigate('/');
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return <Loading style={{ width: '25%' }} />;
  }
  if (id === undefined) {
    navigate('/');
  }

  if (!movie) {
    return null;
  } else {
    if (!movie) {
      return null;
    }
    return (
      <Wrapper backgroundImage={movie?.posterUrl}>
        <HeaderMoviePage {...movie} />
        <Player sources={movie.videoUrls} />
        <DescriptionMoviePage {...movie} />
        <ManualSlider
          title={'Top Casts'}
          style={{ marginTop: '3em' }}>
          {movie.actors.map((actor) => (
            <CardActor
              key={actor.id}
              {...actor}
            />
          ))}
        </ManualSlider>
        {isComicMovies && (
          <ManualSlider
            style={{ marginTop: '3em', marginBottom: '3em' }}
            title={'More Like this'}>
            {comicMovies?.map((altMovie, index) => (
              <CardMovie
                key={index}
                {...altMovie}
              />
            ))}
          </ManualSlider>
        )}
      </Wrapper>
    );
  }
};

export default MoviePage;
