import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {store} from './store';
import {checkAuthAction, fetchFavoritesAction, fetchHotelsAction} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setDataLoadedStatus} from './store/app-data/app-data';
import browserHistory from './browser-history';
import HistoryRouter from './components/history-route/history-route';

store.dispatch(setDataLoadedStatus(true));
store.dispatch(fetchHotelsAction());
store.dispatch(fetchFavoritesAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer/>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
