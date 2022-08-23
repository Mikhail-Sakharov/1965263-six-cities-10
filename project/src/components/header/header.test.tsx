import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import Header from './header';
import {offers} from '../../mocks/offers';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly when a user is authorized', () => {
    history.push(AppRoute.Main);
    const store = mockStore({
      DATA: {
        favorites: offers
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>
    );

    const signOutLink = screen.getByText(/Sign out/i);

    expect(signOutLink).toBeInTheDocument();
  });

  it('should render correctly when a user is not authorized', () => {
    history.push(AppRoute.Main);
    const store = mockStore({
      DATA: {
        favorites: offers
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>
    );

    const signOutLink = screen.getByText(/Sign in/i);

    expect(signOutLink).toBeInTheDocument();
  });
});
