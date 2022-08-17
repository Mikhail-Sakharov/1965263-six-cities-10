import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';
export const redirectToRouteAction = createAction<AppRoute>('app/redirectToRoute');
