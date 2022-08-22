import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import MainEmpty from './main-empty';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <MainEmpty/>
      </HistoryRouter>
    );

    const statusElement = screen.getByText(/No places to stay available/i);
    const descriptionElement = screen.getByText(/We could not find any property available at the moment/i);

    expect(statusElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
