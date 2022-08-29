import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import {AppRoute} from '../../const';
import {reviews} from '../../mocks/reviews';
import ReviewItem from './review-item';

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Main);
    const mockReview = reviews[0];

    render(
      <HistoryRoute history={history}>
        <ReviewItem review={mockReview}/>
      </HistoryRoute>
    );

    const nameElement = screen.getByText(/Isaac/i);

    expect(nameElement).toBeInTheDocument();
  });
});
