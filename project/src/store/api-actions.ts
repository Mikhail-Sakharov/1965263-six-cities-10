import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {store} from '.';
import {APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const';
import {saveEmail} from '../services/email';
import {saveToken, dropToken} from '../services/token';
import {AuthData} from '../types/auth-data';
import {CommentRequestBody} from '../types/comment-request-body';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {AppDispatch, State} from '../types/state';
import {UserData} from '../types/user-data';
import {loadSelectedOfferAction, loadOffersAction, redirectToRouteAction, requireAuthorization, setDataLoadedStatusAction, setErrorAction, loadNearestOffersAction, loadCommentsAction} from './action';

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setErrorAction(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchHotelsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchHotels',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Hotels);
    dispatch(setDataLoadedStatusAction(true));
    dispatch(loadOffersAction(data));
    dispatch(setDataLoadedStatusAction(false));
  },
);

export const fetchSelectedOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSelectedOffer',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Hotels}/${_arg}`);
    dispatch(setDataLoadedStatusAction(true));
    dispatch(loadSelectedOfferAction(data));
    dispatch(setDataLoadedStatusAction(false));
  },
);

export const fetchNearestOffersAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNearestOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Hotels}/${_arg}/nearby`);
    dispatch(setDataLoadedStatusAction(true));
    dispatch(loadNearestOffersAction(data));
    dispatch(setDataLoadedStatusAction(false));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchComments',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${_arg}`);
    dispatch(setDataLoadedStatusAction(true));
    dispatch(loadCommentsAction(data));
    dispatch(setDataLoadedStatusAction(false));
  },
);

export const postCommentAction = createAsyncThunk<void, CommentRequestBody, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/postComment',
  async (commentRequestBody, {dispatch, extra: api}) => {
    const id = commentRequestBody.offerId;
    delete commentRequestBody.offerId;
    const {data} = await api.post<Review[]>(`${APIRoute.Comments}/${id}`, commentRequestBody);
    dispatch(setDataLoadedStatusAction(true));
    dispatch(loadCommentsAction(data));
    dispatch(setDataLoadedStatusAction(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    saveEmail(email);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRouteAction(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRouteAction(AppRoute.Main));
  },
);
