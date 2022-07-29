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
  Unknown = 'UNKNOWN',
}

export const RATING_COEFFICIENT = 20;

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

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
