import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRoute from '../../components/history-route/history-route';
import {AppRoute} from '../../const';
import {offers} from '../../mocks/offers';
import FavoritesList from './favorites-list';

const mockOffers = offers;
const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: FavoritesList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Favorites);

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <FavoritesList favorites={mockOffers} />
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByTestId('favoritesList')).toBeInTheDocument();
  });
});
