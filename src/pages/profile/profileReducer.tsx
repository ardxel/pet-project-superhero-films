import { UserReduxState } from '@models/User';
import IMovie from '@models/Movie';

export enum ProfileActionKind {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  SHOW_BUTTONS = 'SHOW_BUTTONS',
  HIDE_BUTTONS = 'HIDE_BUTTONS',
  TOGGLE_PROFILE = 'TOGGLE_PROFILE',
  TOGGLE_PRIVATE = 'TOGGLE_PRIVATE',
  TOGGLE_PERSONAL = 'TOGGLE_PERSONAL',
  IS_CHANGED_PROFILE = 'IS_CHANGED_PROFILE',
  LOADING_START = 'LOADING_START',
  LOADING_END = 'LOADING_END',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  SET_MOVIES = 'SET_MOVIES',
}

export interface ProfileAction {
  type: ProfileActionKind;
  payload?: boolean | UserReduxState | IMovie[];
}

export interface ProfileState {
  [key: string]: boolean | IMovie[] | UserReduxState | null;
}

export const initialProfileState: ProfileState = {
  isLoading: false,
  isModalOpen: false,
  isEditProfile: false,
  isEditPrivate: false,
  isEditPersonal: false,
  showButtonGroup: false,
  isChangedProfile: false,
  profileIsChanged: false,
  currentUser: null,
  movies: null,
};

export default function profileReducer(
  state: ProfileState,
  action: ProfileAction
): ProfileState {
  const { type, payload } = action;

  switch (type) {
    case ProfileActionKind.SET_MOVIES:
      return {
        ...state,
        movies: payload as IMovie[],
      };
    case ProfileActionKind.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload as UserReduxState,
      };
    case ProfileActionKind.LOADING_START:
      return {
        ...state,
        isLoading: true,
      };

    case ProfileActionKind.LOADING_END:
      return {
        ...state,
        isLoading: false,
      };

    case ProfileActionKind.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };

    case ProfileActionKind.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        isEditProfile: false,
        isEditPrivate: false,
        isEditPersonal: false,
      };

    case ProfileActionKind.SHOW_BUTTONS:
      return {
        ...state,
        showButtonGroup: true,
      };

    case ProfileActionKind.HIDE_BUTTONS:
      return {
        ...state,
        showButtonGroup: false,
      };

    case ProfileActionKind.TOGGLE_PROFILE:
      return {
        ...state,
        isModalOpen: true,
        isEditProfile: !state.isEditProfile,
      };

    case ProfileActionKind.TOGGLE_PRIVATE:
      return {
        ...state,
        isModalOpen: true,
        isEditPrivate: !state.isEditPrivate,
      };

    case ProfileActionKind.TOGGLE_PERSONAL:
      return {
        ...state,
        isModalOpen: true,
        isEditPersonal: !state.isEditPersonal,
      };
    case ProfileActionKind.IS_CHANGED_PROFILE:
      return {
        ...state,
        isChangedProfile: true,
      };
    default:
      throw Error;
  }
}
