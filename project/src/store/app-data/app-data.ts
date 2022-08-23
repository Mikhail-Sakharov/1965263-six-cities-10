import {createSlice} from '@reduxjs/toolkit';
import {cities, NameSpace} from '../../const';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';
import {sortOffers} from '../../utils';
import {
  fetchHotelsAction,
  fetchSelectedOfferAction,
  fetchNearestOffersAction,
  fetchCommentsAction,
  postCommentAction,
  fetchFavoritesAction
} from '../api-actions';

type InitalState = {
  city: string,
  offers: Offer[],
  selectedCityOffers: Offer[],
  selectedOffer: Offer | null,
  nearestOffers: Offer[],
  comments: Review[],
  favorites: Offer[],
  activeSortOption: string,
  defaultSortedOffers: Offer[],
  isDataLoaded: boolean
}

const initialState: InitalState = {
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

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeCityAction: (state, action) => {
      state.activeSortOption = 'Popular';
      state.city = cities.includes(action.payload) ? action.payload : state.city;
      state.selectedCityOffers = cities.includes(action.payload) ? state.offers.slice().filter((offer) => offer.city.name === action.payload) : state.selectedCityOffers;
      state.defaultSortedOffers = cities.includes(action.payload) ? state.offers.slice().filter((offer) => offer.city.name === action.payload) : state.defaultSortedOffers;
    },
    changeSortTypeAction: (state, action) => {
      state.activeSortOption = action.payload;
      state.selectedCityOffers = sortOffers(state.selectedCityOffers, state.defaultSortedOffers, action.payload);
    },
    setDataLoadedStatus: (state, action) => {
      state.isDataLoaded = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHotelsAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.selectedCityOffers = state.offers.filter((offer) => offer.city.name === state.city);
        state.defaultSortedOffers = state.offers.filter((offer) => offer.city.name === state.city);
        state.isDataLoaded = false;
      })
      .addCase(fetchSelectedOfferAction.fulfilled, (state, action) => {
        state.selectedOffer = action.payload;
      })
      .addCase(fetchNearestOffersAction.fulfilled, (state, action) => {
        state.nearestOffers = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});

export const {changeCityAction, changeSortTypeAction, setDataLoadedStatus} = appData.actions;
