import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import SortOption from './sort-option';

const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    activeSortOption: 'Price: low to high'
  }
});

describe('Component: SortOption', () => {
  it('should render correctly', () => {
    const handleClickSortMenu = jest.fn();

    render(
      <Provider store={store}>
        <SortOption sortOption={'Price: low to high'} onClickOption={handleClickSortMenu}/>
      </Provider>
    );

    const increasingPriceSortOptionElement = screen.getByText(/Price: low to high/i);

    expect(increasingPriceSortOptionElement).toBeInTheDocument();
  });
});
