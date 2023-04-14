import { useReducer } from 'react';
import { Transaction } from '../../types/types';

const now = new Date();

export type FilterDispatch = React.Dispatch<FilterAction>;

type FilterAction =
  | { type: 'SET_MIN_DATE'; date: Date }
  | { type: 'CLEAR_MIN_DATE' }
  | { type: 'SET_MAX_DATE'; date: Date }
  | { type: 'CLEAR_MAX_DATE' };

export type FilterState = {
  dispatch: FilterDispatch;
  filterCount: number;
  minDate: Date;
  maxDate: Date;
  minDateIsSet: boolean;
  maxDateIsSet: boolean;
};

export const useFilterReducer = () =>
  useReducer(
    (prevState: FilterState, action: FilterAction) => {
      let count = prevState.filterCount;
      switch (action.type) {
        case 'SET_MIN_DATE':
          if (!prevState.minDateIsSet) {
            count += 1;
          }
          return {
            ...prevState,
            filterCount: count,
            minDateIsSet: true,
            minDate: action.date,
          };
        case 'CLEAR_MIN_DATE':
          return {
            ...prevState,
            minDateIsSet: false,
            minDate: now,
          };
        case 'SET_MAX_DATE':
          if (!prevState.minDateIsSet) {
            count += 1;
          }
          return {
            ...prevState,
            filterCount: count,
            maxDateIsSet: true,
            maxDate: action.date,
          };
        case 'CLEAR_MAX_DATE':
          return {
            ...prevState,
            maxDateIsSet: false,
            maxDate: now,
          };
        default:
          return prevState;
      }
    },
    {
      filterCount: 0,
      minDate: now,
      maxDate: now,
      minDateIsSet: false,
      maxDateIsSet: false,
      dispatch: () => null,
    },
  );

export type SortDispatch = React.Dispatch<number>;

export type SortState = {
  dispatch: SortDispatch;
  sortedArray: Transaction[];
};
