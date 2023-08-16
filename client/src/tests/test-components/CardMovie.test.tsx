import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { CardMovie } from '@components/card-components';
import { getMovieById } from '../mockServerHandlers';
import Data from '../../../config/tools/DataHelper';
import IMovie from '@models/Movie';
import { renderWithProviders } from '../renderWithProviders';
import { UserServerState } from '@models/User';
import User from '../../../config/tools/UserHelper';
import { act, fireEvent } from '@testing-library/react';
import { sleep } from '@tools/sleep';

const MOCK_USER_STATE = User.getUserReduxState(Data.parseData<UserServerState>('users')[0]);

const CARD_MOVIE_PROPS = Data.parseData('dc')[0] as IMovie;

const USER_TOKEN = '50c524dc-bde5-497c-8458-f4cb618b9e50';

const server = setupServer(rest.get('getMovieById', getMovieById));

beforeAll(() => {
  server.listen();
  localStorage.setItem('user', USER_TOKEN);
});

const props = CARD_MOVIE_PROPS;

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
  localStorage.removeItem('user');
});

describe('<CardMovie> test', () => {
  test('test localStorage user item', async () => {
    expect(localStorage.getItem('user')).toBe(MOCK_USER_STATE.token);
  });

  test('successful rendering of the component', async () => {
    const { container } = renderWithProviders(<CardMovie {...props} />, {
      preloadedState: { user: MOCK_USER_STATE },
    });
    expect(container).toBeVisible();
  });

  test('testing textContent elements', () => {
    const { container } = renderWithProviders(<CardMovie {...props} />, {
      preloadedState: { user: MOCK_USER_STATE },
    });
    const { year, ratingKinopoisk } = CARD_MOVIE_PROPS;

    expect((container.querySelector('span.rating') as HTMLSpanElement).textContent).toBe(ratingKinopoisk.toString());

    expect((container.querySelector('span.year') as HTMLSpanElement).textContent).toBe(year.toString());
  });

  test('test CardMove mouse events', async () => {
    renderWithProviders(<CardMovie {...props} />, {
      preloadedState: { user: MOCK_USER_STATE },
    });

    act(() => {
      fireEvent.mouseEnter(document.querySelector('.container') as HTMLDivElement);
    });

    await act(() => sleep(300));

    expect(document.querySelector('#favorite-icon')).toBeInTheDocument();
  });
});
