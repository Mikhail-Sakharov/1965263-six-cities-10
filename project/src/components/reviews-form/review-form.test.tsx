import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import {offers} from '../../mocks/offers';
import {AppRoute} from '../../const';
import ReviewsForm from './reviews-form';

const mockOffer = offers[0];
const mockStore = configureMockStore();
const store = mockStore({});
const history = createMemoryHistory();

describe('Component: ReviewsForm', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Room);

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <ReviewsForm offerId={mockOffer.id}/>
        </HistoryRoute>
      </Provider>
    );

    const labelElement = screen.getByText(/Your review/i);
    const placeHolderElement = screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i);
    const reviewsHelpElement = screen.getByText(/To submit review please make sure to set/i);
    const buttonElement = screen.getByRole('button');

    expect(labelElement).toBeInTheDocument();
    expect(placeHolderElement).toBeInTheDocument();
    expect(reviewsHelpElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});
