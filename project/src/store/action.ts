import {createAction} from '@reduxjs/toolkit';
import {AppRoute/* , AuthorizationStatus */} from '../const';
/* import {Offer} from '../types/offer';
import {Review} from '../types/review'; */

/* export const changeCityAction = createAction('main/changeCity', (city) => ({
  payload: {
    city
  }
})); */

//export const clickSortMenuAction = createAction('sort/clickSortMenuAction');

/* export const changeSortTypeAction = createAction('sort/changeSortTypeAction', (sortOption) => ({
  payload: {
    sortOption
  }
})); */

/* export const loadOffersAction = createAction<Offer[]>('data/loadOffers');

export const loadSelectedOfferAction = createAction<Offer>('data/loadOffer');

export const loadNearestOffersAction = createAction<Offer[]>('data/loadNearestOffers');

export const loadCommentsAction = createAction<Review[]>('data/loadComments');

export const setDataLoadedStatusAction = createAction<boolean>('data/setDataLoadedStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization'); */

export const setErrorAction = createAction<string | null>('app/setError');

export const redirectToRouteAction = createAction<AppRoute>('app/redirectToRoute');
