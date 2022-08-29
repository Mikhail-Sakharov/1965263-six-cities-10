import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRoute from '../../components/history-route/history-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import Login from './login';

const mockStore = configureMockStore();
const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth
  }
});
const history = createMemoryHistory();
history.push(AppRoute.Login);

describe('Page: Login', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Login/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByTestId('loginPage')).toBeInTheDocument();
  });
});
