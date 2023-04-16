import React from 'react';
import styles from './home.module.scss';
import superstyles from '@styles/superstyles.module.scss';
import ManualSlider from '@components/sliders/manual-slider/ManualSlider';
import franchisesList, {
  FranchiseListResponse
} from '@constants/franchisesList';
import {
  useGetMoviesByFranchiseListQuery,
  useGetMoviesByIdsQuery
} from '@reduxproj//api/moviesApi';
import Loading from '@common/loading/Loading';
import CardMovie from '@components/card-components/card-movie/CardMovie';
import AutoSlider from '@components/sliders/auto-slider/AutoSlider';
import sliderItems from '@constants/HomeSliderPreviewItems';
import { Button } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { classes, formatAgeLimits, toHoursAndMinutes } from '@tools/index';
import { useNavigate } from 'react-router';

const HomePage: React.FC<{}> = () => {
  const { data, isLoading } = useGetMoviesByFranchiseListQuery(franchisesList);
  const {
    data: movieSliderList,
    isLoading: isMoviesLoading
  } = useGetMoviesByIdsQuery(sliderItems.map(item => item.kinopoiskId));
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  } else
    return (
      <main className={styles.home}>
        <div className={styles.container}>
          <div className={styles.preview}>
            {isMoviesLoading && !movieSliderList ? <Loading /> : (
              <AutoSlider delay={6000}>
                {movieSliderList!.map((movie) => {
                  const sliderItem = sliderItems
                      .find(item => item.kinopoiskId === movie.kinopoiskId) as typeof sliderItems[number];

                  return (

                    <div className={styles.item} key={movie.id}>
                      <div className={styles.img}
                           style={{ backgroundImage: `url(${sliderItem.backgroundImage})` }}>
                        <div className={styles.gradient}></div>
                      </div>
                      <div className={styles.info}>
                        <div className={styles.card}>
                          <CardMovie {...movie} disableFlash />
                        </div>
                        <div className={styles.title}>
                          <h3>{movie.nameOriginal} / {movie.nameRu}</h3>
                          <div className={styles.desc}>
                            <span>{movie.year}</span>
                            <span>{toHoursAndMinutes(movie.filmLength)}</span>
                            <span>{formatAgeLimits(movie.ratingAgeLimits || movie.ratingMpaa)}</span>
                          </div>
                          <Button
                            onClick={() => navigate(`/movie/${movie.kinopoiskId}`)}
                            className={classes(styles.watchBtn, superstyles.button)}
                            startIcon={<PlayCircleIcon />}>
                            Watch online
                          </Button>
                        </div>
                      </div>
                    </div>
                  );

                })}
              </AutoSlider>)}
          </div>
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
    )
      ;
};

export default HomePage;
