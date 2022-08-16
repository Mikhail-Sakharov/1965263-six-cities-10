export enum APIRoute {
  Hotels = '/hotels',
  Favorites = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER'
}

export const RATING_COEFFICIENT = 20;

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const listClassNameMap = {
  main: 'cities__places-list places__list tabs__content',
  room: 'near-places__list places__list',
};

export const placeCardClassNameMap = {
  main: 'cities__card place-card',
  room: 'near-places__card place-card',
};

export const imageWrapperClassNameMap = {
  main: 'cities__image-wrapper place-card__image-wrapper',
  room: 'near-places__image-wrapper place-card__image-wrapper',
};

export const ListType = {
  MAIN: 'main',
  ROOM: 'room'
};

export const listTypePathMap = {
  [ListType.MAIN]: (id: number) => `offer/${id}`,
  [ListType.ROOM]: (id: number) => `../offer/${id}`
};

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const TAB_INDEX_VALUE = 0;

export const sortOptions = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export const COMMENT_MAX_LENGTH = 50;

export const INITIAL_RATING_VALUE = 0;
