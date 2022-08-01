import {Offer} from './types/offer';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function transformDate(date: string): string {
  return `${date.match(/.+(?=[T])/)}`;
}

export function humanizeDate(date: string): string {
  return `${monthNames[Number(`${date[5]}${date[6]}`) - 1]} ${date.match(/^\d{4}/)}`;
}

export function sortOffers(stateOffers: Offer[], defaultSortedOffers: Offer[], sortType: string) {
  switch (sortType) {
    case 'Price: low to high':
      return stateOffers.sort((nextOffer, currentOffer) => nextOffer.price - currentOffer.price);
    case 'Price: high to low':
      return stateOffers.sort((nextOffer, currentOffer) => currentOffer.price - nextOffer.price);
    case 'Top rated first':
      return stateOffers.sort((nextOffer, currentOffer) => currentOffer.rating - nextOffer.rating);
    default:
      return defaultSortedOffers;
  }
}
