import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Navbar from '@components/header/navbar/Navbar';

describe('<Navbar> component test', () => {
  it('should render navbar for interaction with app', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Navbar
            isOpen
            setIsOpen={() => true}
            username={'john'}
          />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
