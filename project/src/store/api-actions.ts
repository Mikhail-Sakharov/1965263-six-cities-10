import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {store} from '.';
import {APIRoute, AppRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {saveEmail} from '../services/email';
import {saveToken, dropToken} from '../services/token';
import {AuthData} from '../types/auth-data';
import {CommentRequestBody} from '../types/comment-request-body';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {AppDispatch, State} from '../types/state';
import {UserData} from '../types/user-data';
import {redirectToRouteAction} from './action';
import {setErrorAction} from './app-data/app-data';

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setErrorAction(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchHotelsAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchHotels',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Hotels);
    /* dispatch(setDataLoadedStatusAction(true));
    dispatch(loadOffersAction(data));
    dispatch(setDataLoadedStatusAction(false)); */
    return data;
  },
);

export const fetchSelectedOfferAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSelectedOffer',
  async (_arg, {dispatch, extra: api}) => {
    /* try { */
    const {data} = await api.get<Offer>(`${APIRoute.Hotels}/${_arg}`);
    /* dispatch(setDataLoadedStatusAction(true));
      dispatch(loadSelectedOfferAction(data));
      dispatch(setDataLoadedStatusAction(false)); */
    return data;
    /* } catch (error) {
      dispatch(redirectToRouteAction(AppRoute.NotFound));
    } */
  },
);

export const fetchNearestOffersAction = createAsyncThunk<Offer[], number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNearestOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Hotels}/${_arg}/nearby`);
    /* dispatch(setDataLoadedStatusAction(true));
    dispatch(loadNearestOffersAction(data));
    dispatch(setDataLoadedStatusAction(false)); */
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchComments',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${_arg}`);
    /* dispatch(setDataLoadedStatusAction(true));
    dispatch(loadCommentsAction(data));
    dispatch(setDataLoadedStatusAction(false)); */
    return data;
  },
);

export const postCommentAction = createAsyncThunk<Review[], CommentRequestBody, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/postComment',
  async (commentRequestBody, {dispatch, extra: api}) => {
    const id = commentRequestBody.offerId;
    delete commentRequestBody.offerId;
    const {data} = await api.post<Review[]>(`${APIRoute.Comments}/${id}`, commentRequestBody);
    /* dispatch(setDataLoadedStatusAction(true));
    dispatch(loadCommentsAction(data));
    dispatch(setDataLoadedStatusAction(false)); */
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login);
    /* try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } */
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
    /* dispatch(requireAuthorization(AuthorizationStatus.Auth)); */
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
    /* dispatch(requireAuthorization(AuthorizationStatus.NoAuth)); */
    dispatch(redirectToRouteAction(AppRoute.Main));
  },
);
