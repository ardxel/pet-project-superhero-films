import Loading from '@common/loading/Loading';
import { getListOfMoviesIdFromUserState, sleep } from '@common/tools';
import Wrapper from '@common/wrapper/Wrapper';
import { useLazyFetch } from '@hooks/useFetch';
import useUserProfile from '@hooks/useUserProfile';
import { UserReduxState } from '@models/User';
import ProfileHeader from '@pages/profile/header/ProfileHeader';
import ProfileModal from '@pages/profile/modal/ProfileModal';
import ProfileSliders from '@pages/profile/sliders/ProfileSliders';
import { fetchMoviesByIds } from '@reduxproj/api/movie.api';
import { fetchUserProfile } from '@reduxproj/api/user.api';
import { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import profileReducer, { ProfileActionKind, initialProfileState } from './profileReducer';

export type ProfileFormType = {
  setIsChanged: () => void;
};

const ProfilePage: React.FC = () => {
  const { user: localUserState, isAuthorized } = useUserProfile();
  const [profileState, dispatch] = useReducer(profileReducer, initialProfileState);
  const [fetchProfile, userResponse] = useLazyFetch(fetchUserProfile);
  const [fetchMovies] = useLazyFetch(fetchMoviesByIds);
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
        dispatch({ type: ProfileActionKind.SHOW_BUTTONS });
        dispatch({
          type: ProfileActionKind.SET_CURRENT_USER,
          payload: localUserState,
        });
        user = localUserState;
      }

      if (!isAuthorized) {
        dispatch({ type: ProfileActionKind.HIDE_BUTTONS });

        const userData = (await fetchProfile(username as string)) as UserReduxState;

        dispatch({
          type: ProfileActionKind.SET_CURRENT_USER,
          payload: userData,
        });

        user = userData;
      }

      const moviesIds = getListOfMoviesIdFromUserState(user);
      const moviesResponse = await fetchMovies(moviesIds);
      const movies = moviesResponse?.movies;

      dispatch({ type: ProfileActionKind.SET_MOVIES, payload: movies });
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
        <ProfileHeader
          profileState={profileState}
          dispatch={dispatch}
        />
        <ProfileSliders profileState={profileState} />
        <ProfileModal
          profileState={profileState}
          dispatch={dispatch}
        />
      </Wrapper>
    );
};

export default ProfilePage;
