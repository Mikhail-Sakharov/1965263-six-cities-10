import {configureMockStore} from '@jedmao/redux-mock-store';
import {screen, render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {AppRoute} from '../../const';
import HistoryRoute from '../history-route/history-route';
import City from './city';

const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    city: 'Paris'
  }
});
const history = createMemoryHistory();
history.push(AppRoute.Main);

describe('Component: FavoritesList', () => {
  it('should render correctly', () => {
    const setIsSortMenuOpened = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <City city={'Paris'} setIsSortMenuOpened={setIsSortMenuOpened}/>
        </HistoryRoute>
      </Provider>
    );
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });
});
