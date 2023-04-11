import React, { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router';
import Wrapper from '@common/wrapper/Wrapper';
import { useLazyGetMoviesByIdsQuery } from '@reduxproj//api/moviesApi';
import { getListOfMoviesIdFromUserState, sleep } from '@common/tools';
import Loading from '@common/loading/Loading';
import { useLazyGetProfileQuery } from '@reduxproj//api/userApi';
import profileReducer, {
  initialProfileState,
  ProfileActionKind,
} from './profileReducer';
import ProfileHeader from '@pages/profile/header/ProfileHeader';
import ProfileSliders from '@pages/profile/sliders/ProfileSliders';
import ProfileModal from '@pages/profile/modal/ProfileModal';
import useUserProfile from '@hooks/useUserProfile';

export type ProfileFormType = {
  setIsChanged: () => void;
};

const ProfilePage: React.FC<{}> = () => {
  const { userState: localUserState, isAuthorized } = useUserProfile();
  const [profileState, dispatch] = useReducer(
    profileReducer,
    initialProfileState
  );
  const [fetchProfile] = useLazyGetProfileQuery();
  const [fetchMoviesByIds] = useLazyGetMoviesByIdsQuery();
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/authorization');
    }
  }, []);

  useEffect(() => {
    const preloadProfile = async () => {
      let user;
      if (isAuthorized) {
        await dispatch({ type: ProfileActionKind.SHOW_BUTTONS });
        await dispatch({
          type: ProfileActionKind.SET_CURRENT_USER,
          payload: localUserState,
        });
        user = await localUserState;
      }

      if (!isAuthorized) {
        await dispatch({ type: ProfileActionKind.HIDE_BUTTONS });

        const userResponse = await fetchProfile(username as string);

        const userData = await userResponse.data;

        await dispatch({
          type: ProfileActionKind.SET_CURRENT_USER,
          payload: userData,
        });

        user = await userData;
      }

      const moviesIds = getListOfMoviesIdFromUserState(user);

      const moviesResponse = await fetchMoviesByIds(moviesIds);

      const movies = await moviesResponse.data;

      await dispatch({ type: ProfileActionKind.SET_MOVIES, payload: movies });
    };

    dispatch({ type: ProfileActionKind.LOADING_START });

    preloadProfile();

    dispatch({ type: ProfileActionKind.LOADING_END });
  }, [localUserState]);

  useEffect(() => {
    if (profileState.isChangedProfile) {
      sleep(3000).then(() => window.location.reload());
    }
  }, [profileState.isChangedProfile]);

  if (profileState.isLoading || !profileState.currentUser) {
    return <Loading />;
  } else
    return (
      <Wrapper>
        <ProfileHeader profileState={profileState} dispatch={dispatch} />
        <ProfileSliders profileState={profileState} />
        <ProfileModal profileState={profileState} dispatch={dispatch} />
      </Wrapper>
    );
};

export default ProfilePage;
