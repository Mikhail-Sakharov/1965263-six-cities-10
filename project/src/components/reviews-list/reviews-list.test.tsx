import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import {AppRoute} from '../../const';
import {reviews} from '../../mocks/reviews';
import ReviewsList from './reviews-list';

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Main);
    const mockReviews = reviews;

    render(
      <HistoryRoute history={history}>
        <ReviewsList reviews={mockReviews}/>
      </HistoryRoute>
    );

    expect(screen.getByTestId('reviewsList')).toBeInTheDocument();
  });
});
