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

export function getListTypeClass(listType: string) {
  switch(listType) {
    case 'main':
      return 'cities__places-list places__list tabs__content';
    case 'room':
      return 'near-places__list places__list';
  }
}
