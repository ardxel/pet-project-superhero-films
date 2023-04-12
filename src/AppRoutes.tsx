import { lazy } from 'react';
import HomePage from '@pages/home/Home';

const NewsPage = lazy(() => import('@pages/news/News'));
const MoviePage = lazy(() => import('@pages/movie-page/MoviePage'));
const ProfilePage = lazy(() => import('@pages/profile/Profile'));
const AuthorizationPage = lazy(() => import('@pages/authorization/Authorization'));

const appRoutes = [
  {
    path: undefined,
    Element: HomePage,
    index: true
  },
  {
    path: '/news',
    Element: NewsPage
  },
  {
    path: '/movie/:id',
    Element: MoviePage
  },
  {
    path: '/authorization',
    Element: AuthorizationPage
  },
  {
    path: '/profile/:username',
    Element: ProfilePage
  }
];

export default appRoutes;

