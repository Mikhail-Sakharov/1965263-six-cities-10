import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRoute from '../../components/history-route/history-route';
import {offers} from '../../mocks/offers';
import FavoritesCard from './favorites-card';

const mockFavoriteOffer = offers[0];
const mockStore = configureMockStore();

describe('Component: FavoritesCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <HistoryRoute history={history}>
          <FavoritesCard favoriteOffer={mockFavoriteOffer}/>
        </HistoryRoute>
      </Provider>
    );

    const articleElement = screen.getByRole('article');
    const imageElement = screen.getByRole('img');
    const bookMarkButtonElement = screen.getByRole('button');
    const titleElement = screen.getByText(/Amazing and Extremely Central Flat/i);

    expect(articleElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(bookMarkButtonElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
});
