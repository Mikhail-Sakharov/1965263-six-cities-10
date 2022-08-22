import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import CitiesList from './cities-list';

const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    city: 'Paris'
  }
});
const history = createMemoryHistory();

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const setIsSortMenuOpened = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList setIsSortMenuOpened={setIsSortMenuOpened}/>
        </HistoryRouter>
      </Provider>
    );

    const linkToParisOffersElement = screen.getByText(/Paris/i);
    const linkToCologneOffersElement = screen.getByText(/Cologne/i);
    const linkToBrusselsOffersElement = screen.getByText(/Brussels/i);
    const linkToAmsterdamOffersElement = screen.getByText(/Amsterdam/i);
    const linkToHamburgOffersElement = screen.getByText(/Hamburg/i);
    const linkToDusseldorfOffersElement = screen.getByText(/Dusseldorf/i);

    expect(linkToParisOffersElement).toBeInTheDocument();
    expect(linkToCologneOffersElement).toBeInTheDocument();
    expect(linkToBrusselsOffersElement).toBeInTheDocument();
    expect(linkToAmsterdamOffersElement).toBeInTheDocument();
    expect(linkToHamburgOffersElement).toBeInTheDocument();
    expect(linkToDusseldorfOffersElement).toBeInTheDocument();
  });
});
