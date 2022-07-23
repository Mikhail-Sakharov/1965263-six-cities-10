import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {reviews} from './mocks/reviews';

const RENT_OFFERS_VALUE = 312;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App rentOffersCount={RENT_OFFERS_VALUE} offers={offers} reviews={reviews}/>
  </React.StrictMode>,
);
