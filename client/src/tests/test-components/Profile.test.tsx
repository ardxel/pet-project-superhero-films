import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { getMoviesByIds, getProfile } from '../mockServerHandlers';
import User from '../../../config/tools/UserHelper';
import Data from '../../../config/tools/DataHelper';
import { UserServerState } from '@models/User';
import { renderWithProviders } from '../renderWithProviders';
import ProfilePage from '@pages/profile/Profile';
import ReactRouter from 'react-router';

const MOCK_USER_STATE = User.getUserReduxState(Data.parseData<UserServerState>('users')[0]);

const USER_TOKEN = MOCK_USER_STATE.token;

const server = setupServer(rest.get('/getProfile/:username', getProfile), rest.get('/getMoviesByIds', getMoviesByIds));

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
  localStorage.setItem('user', USER_TOKEN as string);
});

beforeEach(() => {
  jest.spyOn(ReactRouter, 'useParams').mockReturnValue({
    username: MOCK_USER_STATE.username as string,
  });
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
  localStorage.removeItem('user');
});

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn().mockReturnValue({ username: 'john123' }),
}));

describe('<Profile> page test', () => {
  const renderProfileWithPreloadUserState = async () =>
    renderWithProviders(<ProfilePage />, {
      preloadedState: { user: MOCK_USER_STATE },
    });

  test('test localStorage user item', async () => {
    expect(localStorage.getItem('user')).toBe(MOCK_USER_STATE.token);
  });

  test('successful rendering of the component with preloaded state', async () => {
    let options;
    await act(async () => {
      options = await renderProfileWithPreloadUserState();
    });

    const main = await waitFor(() => screen.getByTestId('main-wrapper'));

    expect(main).toBeInTheDocument();
  });

  test('test profile edit profile buttons', async () => {
    let options;
    await act(async () => {
      options = await renderProfileWithPreloadUserState();
    });

    const main = await waitFor(() => screen.getByTestId('main-wrapper'));

    expect(await screen.findByText('no image')).toBeInTheDocument();

    const linkButtons = await main.querySelectorAll('.linkButton');
    // expected 3 edit profile buttons or more
    expect(linkButtons.length).toBeGreaterThanOrEqual(3);

    //click on the first edit profile button
    fireEvent.click(linkButtons[0]);

    await waitFor(() => {
      expect(screen.getByTestId('edit-profile-modal')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.keyDown(screen.getByTestId('edit-profile-modal'), {
        key: 'Escape',
        code: 'Escape',
      });
      fireEvent.keyUp(screen.getByTestId('edit-profile-modal'), {
        key: 'Escape',
        code: 'Escape',
      });
    });

    expect(document.querySelector('div[data-testid="title-form-edit-profile"]')).not.toBeInTheDocument();
  });
});
