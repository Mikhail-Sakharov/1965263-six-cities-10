import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRoute from '../../components/history-route/history-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {offers} from '../../mocks/offers';
import Favorites from './favorites';

const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    favorites: offers
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Auth
  }
});
const history = createMemoryHistory();
history.push(AppRoute.Favorites);

describe('Page: Favorites', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Favorites/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByTestId('favoritesPage')).toBeInTheDocument();
  });
});
