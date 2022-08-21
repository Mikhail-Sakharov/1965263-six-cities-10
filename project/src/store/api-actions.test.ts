import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {checkAuthAction, fetchCommentsAction, fetchFavoritesAction, fetchHotelsAction, fetchNearestOffersAction, fetchSelectedOfferAction, postCommentAction, postFavoriteAction} from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {offers} from '../mocks/offers';
import {reviews} from '../mocks/reviews';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should return «auth» authorization status when server returns 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch "fetchHotelsAction" when GET /hotels', async () => {
    const mockOffers = offers;
    mockAPI
      .onGet(APIRoute.Hotels)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchHotelsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchHotelsAction.pending.type,
      fetchHotelsAction.fulfilled.type
    ]);
  });

  it('should dispatch "fetchSelectedOfferAction" when GET /hotels/:id', async () => {
    const mockOffer = offers[0];
    const mockId = offers[0].id;
    mockAPI
      .onGet(`${APIRoute.Hotels}/${mockId}`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(fetchSelectedOfferAction(mockId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSelectedOfferAction.pending.type,
      fetchSelectedOfferAction.fulfilled.type
    ]);
  });

  it('should dispatch "fetchNearestOffersAction" when GET /hotels/:id/nearby', async () => {
    const mockOffers = offers;
    const mockId = offers[0].id;
    mockAPI
      .onGet(`${APIRoute.Hotels}/${mockId}/nearby`)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchNearestOffersAction(mockId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearestOffersAction.pending.type,
      fetchNearestOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch "fetchCommentsAction" when GET /comments', async () => {
    const mockComments = reviews;
    const mockId = offers[0].id;
    mockAPI
      .onGet(`${APIRoute.Comments}/${mockId}`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction(mockId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type
    ]);
  });

  it('should dispatch "fetchFavoritesAction" when GET /favorite', async () => {
    const mockFavorites = offers;
    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, mockFavorites);

    const store = mockStore();

    await store.dispatch(fetchFavoritesAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoritesAction.pending.type,
      fetchFavoritesAction.fulfilled.type
    ]);
  });

  it('should dispatch "postCommentAction" when POST /comments', async () => {
    const mockComments = reviews;
    const mockComment = reviews[0];
    const mockRating = reviews[0].rating;
    const mockId = offers[0].id;
    mockAPI
      .onPost(`${APIRoute.Comments}/${mockId}`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(postCommentAction({offerId: mockId, comment: mockComment.comment, rating: mockRating}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postCommentAction.pending.type,
      postCommentAction.fulfilled.type
    ]);
  });

  it('should dispatch "postFavoriteAction" when POST /favorite', async () => {
    const mockId = offers[0].id;
    const mockFavorite = offers[0];
    const postFavoriteStatus = 1;
    mockAPI
      .onPost(`${APIRoute.Favorites}/${mockId}/${postFavoriteStatus}`)
      .reply(200, mockFavorite);

    const store = mockStore();

    await store.dispatch(postFavoriteAction({offerId: mockId, postFavoriteStatus}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postFavoriteAction.pending.type,
      postFavoriteAction.fulfilled.type
    ]);
  });
});
