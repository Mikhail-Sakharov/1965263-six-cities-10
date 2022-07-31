import {createAction} from '@reduxjs/toolkit';

export const changeCityAction = createAction('main/changeCity', (city, offers) => ({
  payload: {
    city,
    offers
  }
}));
