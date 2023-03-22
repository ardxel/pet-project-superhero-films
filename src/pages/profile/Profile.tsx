import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './profile.module.scss';
import superstyles from '@styles/superstyles.module.scss';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from '@hooks/useAppSelector';
import Wrapper from 'common/wrapper/Wrapper';
import { Box, Button, ButtonGroup, Modal, Paper } from '@mui/material';
import ManualSlider from '@components/sliders/manual-slider/ManualSlider';
import { useLazyGetMoviesByIdsQuery } from 'redux/api/moviesApi';
import { getListOfMoviesIdFromUserState, sleep } from 'common/tools';
import Loading from 'common/loading/Loading';
import { CardMovie } from '@components/card-components';
import IMovie from 'models/Movie';
import profileSliderList from '@constants/profileSliderList';
import {
  EditPersonalForm,
  EditPrivateForm,
  EditProfileForm,
} from '@components/forms/profile';
import { useLazyGetProfileQuery } from 'redux/api/userApi';
import { UserReduxState } from 'models/User';

export type ProfileFormType = {
  setIsChanged: (arg: boolean) => void;
};

const Profile: React.FC<{}> = () => {
  const [isChangedProfile, setIsChangedProfile] = useState<boolean>(false);
  const [showButtonGroup, setShowButtonGroup] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditProfile, setIdEditProfile] = useState<boolean>(false);
  const [isEditPrivate, setIsEditPrivate] = useState<boolean>(false);
  const [isEditPersonal, setIsEditPersonal] = useState<boolean>(false);
  const [fetchProfile, profileResponse] = useLazyGetProfileQuery();
  const [fetchMoviesByIds, moviesResponse] = useLazyGetMoviesByIdsQuery();
  const { username } = useParams();
  const userState = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  if (!username) {
    navigate('/authorization');
    return null;
  }
  useLayoutEffect(() => {
    if (username !== userState.username && !userState.token) {
      setShowButtonGroup(false);
    } else {
      setShowButtonGroup(true);
    }
    fetchProfile(username);
  }, [userState]);

  useEffect(() => {
    if (isChangedProfile) {
      sleep(3000).then(() => window.location.reload());
    }
  }, [isChangedProfile]);

  useEffect(() => {
    if (profileResponse.isSuccess) {
      sleep()
        .then(() => getListOfMoviesIdFromUserState(profileResponse.data))
        .then(fetchMoviesByIds);
    }
  }, [profileResponse]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIdEditProfile(false);
    setIsEditPrivate(false);
    setIsEditPersonal(false);
  };
  const toggleIsEditProfile = () => {
    openModal();
    setIdEditProfile(!isEditProfile);
  };
  const toggleIsEditPrivate = () => {
    openModal();
    setIsEditPrivate(!isEditPrivate);
  };
  const toggleIsEditPersonal = () => {
    openModal();
    setIsEditPersonal(!isEditPersonal);
  };
  if (profileResponse.isLoading) {
    return <Loading />;
  } else if (profileResponse.isError) {
    navigate('/home');
    return null;
  } else if (profileResponse.isSuccess) {
    const { username, name, biography, avatar } =
      profileResponse.data as UserReduxState;
    return (
      <Wrapper>
        <Paper elevation={3} className={styles.paper}>
          <div className={styles.head}>
            <div className={styles.info}>
              <div className={styles.img}>
                {avatar ? <img src={avatar} /> : <span>no image</span>}
              </div>
              <div className={styles.name}>
                <h3>{username}</h3>
                <h6>{name || 'no name'}</h6>
              </div>
            </div>

            {showButtonGroup && (
              <div className={styles.edit}>
                <ButtonGroup
                  orientation="vertical"
                  variant="outlined"
                  sx={{ boxShadow: 12 }}
                >
                  <Button
                    className={superstyles.linkButton}
                    onClick={toggleIsEditProfile}
                  >
                    Edit profile
                  </Button>
                  <Button
                    className={superstyles.linkButton}
                    onClick={toggleIsEditPrivate}
                  >
                    Change Password
                  </Button>
                  <Button
                    className={superstyles.linkButton}
                    onClick={toggleIsEditPersonal}
                  >
                    Personal Details
                  </Button>
                </ButtonGroup>
              </div>
            )}
          </div>

          {biography && (
            <div className={styles.bio}>
              <h3>Bio:</h3>
              <p>{userState.biography}</p>
            </div>
          )}
          {moviesResponse.isFetching && <Loading />}
          {moviesResponse.isSuccess && (
            <section className={styles.sliders}>
              {profileSliderList.map((slider) => (
                <ManualSlider key={slider.id} title={slider.title}>
                  {profileResponse.data[slider.key].map((item) => {
                    const matchedMovie = moviesResponse.data.find((movie) => {
                      if (
                        typeof item === 'object' &&
                        item.hasOwnProperty('id')
                      ) {
                        return movie.kinopoiskId === item.id;
                      }
                      return movie.kinopoiskId === item;
                    }) as IMovie;
                    if (matchedMovie) {
                      return (
                        <CardMovie key={matchedMovie!.id} {...matchedMovie} />
                      );
                    }
                  })}
                </ManualSlider>
              ))}
            </section>
          )}
        </Paper>
        <Modal open={isModalOpen} onClose={closeModal}>
          <Box className={styles.box}>
            {isEditProfile && (
              <EditProfileForm setIsChanged={setIsChangedProfile} />
            )}
            {isEditPrivate && (
              <EditPrivateForm setIsChanged={setIsChangedProfile} />
            )}
            {isEditPersonal && (
              <EditPersonalForm setIsChanged={setIsChangedProfile} />
            )}
          </Box>
        </Modal>
      </Wrapper>
    );
  }
};

export default Profile;
