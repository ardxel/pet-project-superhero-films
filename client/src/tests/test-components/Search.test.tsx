import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Search from '@components/search/Search';
import store from '@reduxproj/store';
import { Provider } from 'react-redux';
describe('<Search> component test', () => {
  it('should render input for searching', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <Search isOpen setIsOpen={() => true} />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
