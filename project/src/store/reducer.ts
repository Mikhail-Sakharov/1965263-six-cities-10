import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../const';
import {offers} from '../mocks/offers';
import {Offer} from '../types/offer';
import {sortOffers} from '../utils';
import {
  changeCityAction, changeSortTypeAction,
  clickSortMenuAction, loadOffersAction,
  requireAuthorization, setDataLoadedStatusAction, setErrorAction
} from './action';

type InitalState = {
  city: string,
  offers: Offer[],
  isSortMenuOpened: boolean,
  activeSortOption: string,
  defaultSortedOffers: Offer[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  error: string | null
}

const initialState: InitalState = {
  city: 'Paris',
  offers: offers.filter((offer) => offer.city.name === 'Paris'),
  isSortMenuOpened: false,
  activeSortOption: 'Popular',
  defaultSortedOffers: offers.filter((offer) => offer.city.name === 'Paris'),
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  error: null
};

export const reducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(changeCityAction, (state, action) => {
        state.activeSortOption = 'Popular';
        state.isSortMenuOpened = false;
        state.city = action.payload.city;
        state.offers = action.payload.offers.filter((offer: Offer) => offer.city.name === action.payload.city);
        state.defaultSortedOffers = action.payload.offers.filter((offer: Offer) => offer.city.name === action.payload.city);
      })
      .addCase(clickSortMenuAction, (state) => {
        state.isSortMenuOpened = !state.isSortMenuOpened;
      })
      .addCase(changeSortTypeAction, (state, action) => {
        state.activeSortOption = action.payload.sortOption;
        state.isSortMenuOpened = false;
        state.offers = sortOffers(state.offers, state.defaultSortedOffers, action.payload.sortOption);
      })
      .addCase(loadOffersAction, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(setDataLoadedStatusAction, (state, action) => {
        state.isDataLoaded = action.payload;
      })
      .addCase(requireAuthorization, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setErrorAction, (state, action) => {
        state.error = action.payload;
      });
  }
);
