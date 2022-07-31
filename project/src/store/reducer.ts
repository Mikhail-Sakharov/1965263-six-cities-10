import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {Offer} from '../types/offer';
import {changeCityAction} from './action';

const initialState = {
  city: 'Paris',
  offers: offers.filter((offer) => offer.city.name === 'Paris')
};

export const reducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(changeCityAction, (state, action) => {
        state.city = action.payload.city;
        state.offers = action.payload.offers.filter((offer: Offer) => offer.city.name === action.payload.city);
      });
  }
);
