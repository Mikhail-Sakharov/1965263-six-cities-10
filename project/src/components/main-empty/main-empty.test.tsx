import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import HistoryRoute from '../../components/history-route/history-route';
import MainEmpty from './main-empty';

const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    city: 'Paris'
  }
});

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <MainEmpty/>
        </HistoryRoute>
      </Provider>
    );

    const statusElement = screen.getByText(/No places to stay available/i);
    const descriptionElement = screen.getByText(/We could not find any property available at the moment/i);

    expect(statusElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
