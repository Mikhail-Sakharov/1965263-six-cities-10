import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {AppRoute} from '../../const';
import SortOptionsList from './sort-options-list';

const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    activeSortOption: ''
  }
});
const history = createMemoryHistory();

describe('Component: SortOptionsList', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Main);
    const isSortMenuOpened = true;
    const setIsSortMenuOpened = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortOptionsList isSortMenuOpened={isSortMenuOpened} setIsSortMenuOpened={setIsSortMenuOpened}/>
        </HistoryRouter>
      </Provider>
    );

    const increasingPriceSortOptionElement = screen.getByText(/Price: low to high/i);
    const decreasingPriceSortOptionElement = screen.getByText(/Price: high to low/i);
    const topRatedSortOptionElement = screen.getByText(/Top rated first/i);
    const popularSortOptionElement = screen.getByText(/Popular/i);
    const spanElement = screen.getByText(/Sort by/i);

    expect(increasingPriceSortOptionElement).toBeInTheDocument();
    expect(decreasingPriceSortOptionElement).toBeInTheDocument();
    expect(topRatedSortOptionElement).toBeInTheDocument();
    expect(popularSortOptionElement).toBeInTheDocument();
    expect(spanElement).toBeInTheDocument();
  });
});
