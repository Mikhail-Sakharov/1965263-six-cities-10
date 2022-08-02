import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {Offer} from '../types/offer';
import {sortOffers} from '../utils';
import {changeCityAction, changeSortTypeAction, clickSortMenuAction} from './action';

const initialState = {
  city: 'Paris',
  offers: offers.filter((offer) => offer.city.name === 'Paris'),
  isSortMenuOpened: false,
  activeSortOption: 'Popular',
  defaultSortedOffers: offers.filter((offer) => offer.city.name === 'Paris')
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
      });
  }
);
