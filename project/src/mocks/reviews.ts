import {Review} from '../types/review';

export const reviews: Review[] = [
  {
    id: 1,
    user: {
      id: 12,
      isPro: true,
      name: 'Isaac',
      avatarUrl: 'https://10.react.pages.academy/static/avatar/3.jpg'
    },
    rating: 4,
    comment: 'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
    date: '2022-12-13T12:25:36.938Z'
  },
  {
    id: 2,
    user: {
      id: 13,
      isPro: false,
      name: 'Zak',
      avatarUrl: 'https://10.react.pages.academy/static/avatar/4.jpg'
    },
    rating: 3,
    comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
    date: '2022-11-05T12:25:36.939Z'
  },
  {
    id: 3,
    user: {
      id: 18,
      isPro: true,
      name: 'Sophie',
      avatarUrl: 'https://10.react.pages.academy/static/avatar/9.jpg'
    },
    rating: 4,
    comment: 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2022-05-25T12:25:36.939Z'
  }
];
