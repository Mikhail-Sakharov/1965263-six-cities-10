import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {offers} from '../../mocks/offers';
import PlaceCard from './place-card';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';

const mockOffer = offers[0];
const mockStore = configureMockStore();
const store = mockStore({
  DATA: {selectedOffer: offers[0]},
  USER: {authorizationStatus: AuthorizationStatus.Auth}
});
const history = createMemoryHistory();

describe('Component: PlaceCard', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Main);
    const onOfferItemHover = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard listType={'main'} offer={mockOffer} onOfferItemHover={onOfferItemHover}/>
        </HistoryRouter>
      </Provider>
    );

    const titleElement = screen.getByText(/Amazing and Extremely Central Flat/i);
    const priceElement = screen.getByText(/462/i);

    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });
});
