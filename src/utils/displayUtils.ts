import { Moment } from 'moment';

export const formatValueForDisplay = (value: number) =>
  (value / 100).toFixed(2);

export const formatTimeForDisplay = (date: Moment) => date.format('h:mmA');
