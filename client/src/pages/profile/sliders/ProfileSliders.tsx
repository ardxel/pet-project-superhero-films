import React from 'react';
import styles from './profileSliders.module.scss';
import Loading from '@common/loading/Loading';
import profileSliderList from '@constants/profileSliderList';
import ManualSlider from '@components/sliders/manual-slider/ManualSlider';
import IMovie from '@models/Movie';
import { CardMovie } from '@components/card-components';
import { ProfileState } from '@pages/profile/profileReducer';

interface ProfileSlidersProps {
  profileState: ProfileState;
}

const ProfileSliders: React.FC<ProfileSlidersProps> = ({ ...props }) => {
  const { profileState } = props;

  if (!profileState.movies && profileState.isLoading) {
    return <Loading />;
  } else if (profileState.movies && !profileState.isLoading) {
    return (
      <section className={styles.sliders}>
        {profileSliderList.map((slider) => {
          if (
            profileState.currentUser &&
            profileState.currentUser[slider.key].length !== 0 &&
            profileState.movies
          ) {
            return (
              <ManualSlider key={slider.id} title={slider.title}>
                {profileState.currentUser[slider.key].map((item) => {
                  const matchedMovie = (profileState!.movies! as IMovie[]).find(
                    (movie) => {
                      if (
                        typeof item === 'object' &&
                        item.hasOwnProperty('id')
                      ) {
                        return movie.kinopoiskId === item.id;
                      }
                      return movie.kinopoiskId === item;
                    }
                  ) as IMovie;
                  if (matchedMovie) {
                    return (
                      <CardMovie
                        showRating={slider.key === 'ratings'}
                        key={matchedMovie.kinopoiskId}
                        {...matchedMovie}
                      />
                    );
                  }
                })}
              </ManualSlider>
            );
          }
        })}
      </section>
    );
  } else return null;
};

export default ProfileSliders;
