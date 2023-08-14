import AppFallback from '@common/fallback/AppFallback';
import Loading from '@common/loading/Loading';
import CardMovie from '@components/card-components/card-movie/CardMovie';
import AutoSlider from '@components/sliders/auto-slider/AutoSlider';
import ManualSlider from '@components/sliders/manual-slider/ManualSlider';
import sliderItems from '@constants/HomeSliderPreviewItems';
import BASE_URL from '@constants/baseUrl';
import franchisesList, {
  FranchiseListResponse,
} from '@constants/franchisesList';
import IMovie from '@models/Movie';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Button } from '@mui/material';
import { useGetMoviesByIdsQuery } from '@reduxproj//api/moviesApi';
import superstyles from '@styles/superstyles.module.scss';
import { classes, formatAgeLimits, toHoursAndMinutes } from '@tools/index';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<FranchiseListResponse[]>([]);

  async function fetchMoviesByKeyword(keyword: string) {
    const response = await axios.get(`${BASE_URL}movies/?search=${keyword}`);
    if (await response.data.success) {
      return { title: keyword, movies: response.data.data.movies as IMovie[] };
    }
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all(
      franchisesList
        .map((item) => item.keywords[0])
        .map((keyword) => fetchMoviesByKeyword(keyword))
    )
      .then((data) => {
        if (data) {
          setData(data as FranchiseListResponse[]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const { data: movieSliderList, isLoading: isMoviesLoading } =
    useGetMoviesByIdsQuery(sliderItems.map((item) => item._movieId));
  // const navigate = useNavigate();

  if (isLoading) {
    return <AppFallback />;
  } else
    return (
      <main className={styles.home}>
        <div className={styles.container}>
          <div className={styles.preview}>
            {isMoviesLoading && !movieSliderList ? (
              <Loading />
            ) : (
              <AutoSlider delay={6000}>
                {movieSliderList!.map((movie) => {
                  const sliderItem = sliderItems.find(
                    (item) => item._movieId === movie._movieId
                  ) as (typeof sliderItems)[number];

                  return (
                    <div className={styles.item} key={movie._dbId}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${sliderItem.backgroundImage})`,
                        }}
                      >
                        <div className={styles.gradient}></div>
                      </div>
                      <div className={styles.info}>
                        <div className={styles.card}>
                          <CardMovie {...movie} disableFlash />
                        </div>
                        <div className={styles.title}>
                          <h3>
                            {movie.nameOriginal} / {movie.nameRu}
                          </h3>
                          <div className={styles.desc}>
                            <span>{movie.year}</span>
                            <span>{toHoursAndMinutes(movie.filmLength)}</span>
                            <span>
                              {formatAgeLimits(
                                movie.ratingAgeLimits || movie.ratingMpaa
                              )}
                            </span>
                          </div>
                          <Button
                            // onClick={() => navigate(`/movie/${movie._movieId}`)}
                            className={classes(
                              styles.watchBtn,
                              superstyles.button
                            )}
                            startIcon={<PlayCircleIcon />}
                          >
                            Watch online
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </AutoSlider>
            )}
          </div>
          {data.map((franchise, index) => {
            const { title, movies } = franchise;
            return (
              <ManualSlider key={index} title={title}>
                {movies.map((movie) => (
                  <CardMovie key={movie._movieId} {...movie} />
                ))}
              </ManualSlider>
            );
          })}
        </div>
      </main>
    );
};

export default HomePage;
