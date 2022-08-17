import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {appData} from './app-data/app-data';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: appData.reducer
});
