import {store} from '../store';
import {clearErrorAction} from '../store/api-actions';
import {setErrorAction} from '../store/app-data/app-data';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setErrorAction(message));
  store.dispatch(clearErrorAction());
};
