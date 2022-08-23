import {offers} from '../../mocks/offers';
import {appData, changeCityAction, changeSortTypeAction, setDataLoadedStatus} from './app-data';

describe('Reducer: appData', () => {
  const mockOffers = offers;
  const initialState = {
    city: 'Paris',
    offers: [],
    selectedCityOffers: [],
    selectedOffer: null,
    nearestOffers: [],
    comments: [],
    favorites: [],
    activeSortOption: 'Popular',
    defaultSortedOffers: [],
    isDataLoaded: false
  };
  const state = {
    city: 'Paris',
    offers: mockOffers,
    selectedCityOffers: mockOffers.filter((offer) => offer.city.name === 'Paris'),
    selectedOffer: null,
    nearestOffers: [],
    comments: [],
    favorites: [],
    activeSortOption: 'Popular',
    defaultSortedOffers: mockOffers.filter((offer) => offer.city.name === 'Paris'),
    isDataLoaded: false
  };

  it('without additional parameters should return the initial state', () => {
    expect(appData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change the "city" and the "selectedCityOffers"', () => {
    expect(appData.reducer(state, changeCityAction('Cologne')))
      .toEqual(
        {
          city: 'Cologne',
          offers: state.offers,
          selectedCityOffers: state.offers.filter((offer) => offer.city.name === 'Cologne'),
          selectedOffer: null,
          nearestOffers: [],
          comments: [],
          favorites: [],
          activeSortOption: 'Popular',
          defaultSortedOffers: state.offers.filter((offer) => offer.city.name === 'Cologne'),
          isDataLoaded: false
        }
      );
  });

  it('should return the state if it\'s passed an unknown value', () => {
    expect(appData.reducer(state, changeCityAction('unknown')))
      .toEqual(state);
  });

  it('should switch "isDataLoaded" using booleans', () => {
    expect(appData.reducer(initialState, setDataLoadedStatus(true)))
      .toEqual({
        ...initialState,
        isDataLoaded: true
      });

    expect(appData.reducer(initialState, setDataLoadedStatus(false)))
      .toEqual({
        ...initialState,
        isDataLoaded: false
      });
  });

  it('should change "activeSortOption" and sort "selectedCityOffers"', () => {
    expect(appData.reducer(state, changeSortTypeAction('Price: low to high')))
      .toEqual({
        ...state,
        selectedCityOffers: mockOffers.filter((offer) => offer.city.name === 'Paris').sort((nextOffer, currentOffer) => nextOffer.price - currentOffer.price),
        activeSortOption: 'Price: low to high',
      });

    expect(appData.reducer(state, changeSortTypeAction('Price: high to low')))
      .toEqual({
        ...state,
        selectedCityOffers: mockOffers.filter((offer) => offer.city.name === 'Paris').sort((nextOffer, currentOffer) => currentOffer.price - nextOffer.price),
        activeSortOption: 'Price: high to low',
      });

    expect(appData.reducer(state, changeSortTypeAction('Top rated first')))
      .toEqual({
        ...state,
        selectedCityOffers: mockOffers.filter((offer) => offer.city.name === 'Paris').sort((nextOffer, currentOffer) => currentOffer.rating - nextOffer.rating),
        activeSortOption: 'Top rated first',
      });

    expect(appData.reducer(state, changeSortTypeAction('Popular')))
      .toEqual({
        ...state,
        selectedCityOffers: mockOffers.filter((offer) => offer.city.name === 'Paris'),
        activeSortOption: 'Popular',
      });
  });
});
