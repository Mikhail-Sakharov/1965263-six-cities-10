import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';
import {sortOffers} from '../../utils';
import {fetchHotelsAction, fetchSelectedOfferAction, fetchNearestOffersAction, fetchCommentsAction, postCommentAction} from '../api-actions';

type InitalState = {
  city: string,
  offers: Offer[],
  selectedCityOffers: Offer[],
  selectedOffer: Offer | null,
  nearestOffers: Offer[],
  comments: Review[],
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
      state.city = action.payload;
      state.selectedCityOffers = state.offers.filter((offer) => offer.city.name === state.city);
      state.defaultSortedOffers = state.offers.filter((offer) => offer.city.name === state.city);
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
      .addCase(fetchHotelsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchHotelsAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.selectedCityOffers = state.offers.filter((offer) => offer.city.name === state.city);
        state.isDataLoaded = false;
      })
      .addCase(fetchSelectedOfferAction.pending, (state) => {
        //state.isDataLoaded = true;//
      })
      .addCase(fetchSelectedOfferAction.fulfilled, (state, action) => {
        state.selectedOffer = action.payload;
        //state.isDataLoaded = false;
      })
      /* .addCase(fetchNearestOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      }) */
      .addCase(fetchNearestOffersAction.fulfilled, (state, action) => {
        state.nearestOffers = action.payload;
        //state.isDataLoaded = false;
      })
      /* .addCase(fetchCommentsAction.pending, (state) => {
        state.isDataLoaded = true;
      }) */
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        //state.isDataLoaded = false;//
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isDataLoaded = false;
      });
  }
});

export const {changeCityAction, changeSortTypeAction, setDataLoadedStatus} = appData.actions;
