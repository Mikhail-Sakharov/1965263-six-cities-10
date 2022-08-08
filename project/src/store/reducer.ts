import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../const';
import {Offer} from '../types/offer';
import {sortOffers} from '../utils';
import {
  changeCityAction, changeSortTypeAction,
  loadNearestOffersAction,
  loadOffersAction, loadSelectedOfferAction, requireAuthorization,
  setDataLoadedStatusAction, setErrorAction
} from './action';

type InitalState = {
  city: string,
  offers: Offer[],
  selectedCityOffers: Offer[],
  selectedOffer: Offer | null,
  nearestOffers: Offer[],
  activeSortOption: string,
  defaultSortedOffers: Offer[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  error: string | null
}

const initialState: InitalState = {
  city: 'Paris',
  offers: [],
  selectedCityOffers: [],
  selectedOffer: null,
  nearestOffers: [],
  activeSortOption: 'Popular',
  defaultSortedOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  error: null
};

export const reducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(changeCityAction, (state, action) => {
        state.activeSortOption = 'Popular';
        state.city = action.payload.city;
        state.selectedCityOffers = state.offers.filter((offer) => offer.city.name === state.city);
        state.defaultSortedOffers = state.offers.filter((offer) => offer.city.name === state.city);
      }).addCase(changeSortTypeAction, (state, action) => {
        state.activeSortOption = action.payload.sortOption;
        state.selectedCityOffers = sortOffers(state.selectedCityOffers, state.defaultSortedOffers, action.payload.sortOption);
      })
      .addCase(loadOffersAction, (state, action) => {
        state.offers = action.payload;
        state.selectedCityOffers = state.offers.filter((offer) => offer.city.name === state.city);
      })
      .addCase(loadSelectedOfferAction, (state, action) => {
        state.selectedOffer = action.payload;
      })
      .addCase(loadNearestOffersAction, (state, action) => {
        state.nearestOffers = action.payload;
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
