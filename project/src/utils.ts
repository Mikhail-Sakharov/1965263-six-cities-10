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
