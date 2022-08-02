import {createAction} from '@reduxjs/toolkit';

export const changeCityAction = createAction('main/changeCity', (city, offers) => ({
  payload: {
    city,
    offers
  }
}));

export const clickSortMenuAction = createAction('sort/clickSortMenuAction');

export const changeSortTypeAction = createAction('sort/changeSortTypeAction', (sortOption) => ({
  payload: {
    sortOption
  }
}));
