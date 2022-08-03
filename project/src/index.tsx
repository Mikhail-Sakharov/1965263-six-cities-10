import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import {reviews} from './mocks/reviews';
import {store} from './store';
import {checkAuthAction, fetchHotelsAction} from './store/api-actions';

store.dispatch(fetchHotelsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store = {store}>
    <React.StrictMode>
      <ErrorMessage/>
      <App reviews={reviews}/>
    </React.StrictMode>
  </Provider>
);
