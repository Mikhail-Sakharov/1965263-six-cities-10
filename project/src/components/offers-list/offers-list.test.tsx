import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRoute from '../../components/history-route/history-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {offers} from '../../mocks/offers';
import OffersList from './offers-list';

const mockOffers = offers;
const mockStore = configureMockStore();
const store = mockStore({
  DATA: {selectedOffer: offers[0]},
  USER: {authorizationStatus: AuthorizationStatus.Auth}
});

describe('Component: OffersList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Main);
    const handleOfferItemHover = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <OffersList listType={'main'} offers={mockOffers} onOfferItemHover={handleOfferItemHover}/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByTestId('offersList')).toBeInTheDocument();
  });
});
