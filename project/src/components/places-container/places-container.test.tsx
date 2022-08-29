import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import PlacesContainer from './places-container';
import {offers} from '../../mocks/offers';
import {AppRoute, AuthorizationStatus} from '../../const';

const mockOffer = offers[0];
const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    city: mockOffer.city.name,
    selectedCityOffers: offers.filter((offer) => offer.city.name === mockOffer.city.name)
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Auth
  }
});
const history = createMemoryHistory();

describe('Component: PlacesContainer', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Main);
    const isSortMenuOpened = false;
    const setIsSortMenuOpened = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <PlacesContainer isSortMenuOpened={isSortMenuOpened} setIsSortMenuOpened={setIsSortMenuOpened}/>
        </HistoryRoute>
      </Provider>
    );

    const placesFoundElement = screen.getByText(/places to stay in/i);

    expect(placesFoundElement).toBeInTheDocument();
  });
});
