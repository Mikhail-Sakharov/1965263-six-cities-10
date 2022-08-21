import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, AppRoute} from '../const';
import {dropEmail, saveEmail} from '../services/email';
import {saveToken, dropToken} from '../services/token';
import {AuthData} from '../types/auth-data';
import {CommentRequestBody} from '../types/comment-request-body';
import {Favorite} from '../types/favorite';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {AppDispatch, State} from '../types/state';
import {UserData} from '../types/user-data';
import {redirectToRouteAction} from './action';

export const fetchHotelsAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchHotels',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Hotels);
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
    const {data} = await api.get<Offer>(`${APIRoute.Hotels}/${_arg}`);
    return data;
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
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorites);
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
    return data;
  },
);

export const postFavoriteAction = createAsyncThunk<Offer, Favorite, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/postFavorite',
  async (FavoriteArgs, {dispatch, extra: api}) => {
    const {offerId, postFavoriteStatus} = FavoriteArgs;
    const {data} = await api.post<Offer>(`${APIRoute.Favorites}/${offerId}/${postFavoriteStatus}`);
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
    dropEmail();
    dispatch(redirectToRouteAction(AppRoute.Main));
  },
);
