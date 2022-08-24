import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import {AuthorizationStatus, AppRoute} from '../../const';
import App from './app';
import {offers} from '../../mocks/offers';
import {reviews} from '../../mocks/reviews';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  DATA: {
    city: 'Paris',
    offers: offers,
    selectedCityOffers: offers.filter((offer) => offer.city.name === 'Paris'),
    selectedOffer: offers[0],
    nearestOffers: offers.slice(0, 3),
    comments: reviews,
    defaultSortedOffers: offers.filter((offer) => offer.city.name === 'Paris'),
    favorites: offers.filter((offer) => offer.isFavorite === true),
    activeSortOption: 'Popular',
    isDataLoaded: false
  }
});

const placesCount = offers.filter((offer) => offer.city.name === 'Paris').length;

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App/>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" page when user navigates to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/Cologne/i)).toBeInTheDocument();
    expect(screen.getByText(/Brussels/i)).toBeInTheDocument();
    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
    expect(screen.getByText(/Hamburg/i)).toBeInTheDocument();
    expect(screen.getByText(/Dusseldorf/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${placesCount} places to stay in Paris`, 'i'))).toBeInTheDocument();
  });

  it('should render "Login" page when user navigates to "/login"', async () => {
    const storeForLoginRenderTest = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth
      },
      DATA: {
        isDataLoaded: false
      }
    });
    const fakeAppForLoginRenderTest = (
      <Provider store={storeForLoginRenderTest}>
        <HistoryRouter history={history}>
          <App/>
        </HistoryRouter>
      </Provider>
    );
    history.push(AppRoute.Login);

    render(fakeAppForLoginRenderTest);

    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
    expect(screen.getByTestId('login')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('submitButton')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('login'), 'Mikhail@mail.com');
    await userEvent.type(screen.getByTestId('password'), '1234567');

    expect(screen.getByDisplayValue(/Mikhail@mail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1234567/i)).toBeInTheDocument();
  });

  it('should render "Favorites" page when user navigates to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Amazing and Extremely Central Flat/i)).toBeInTheDocument();
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "NotFound" page when user navigates to "*"', () => {
    history.push(`/${AppRoute.NotFound}`);

    render(fakeApp);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
