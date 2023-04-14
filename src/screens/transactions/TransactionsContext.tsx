import { useReducer } from 'react';
import { Transaction, TransactionStatus } from '../../types/types';

const now = new Date();

export type FilterDispatch = React.Dispatch<FilterAction>;

type FilterAction =
  | { type: 'SET_MIN_DATE'; date: Date }
  | { type: 'SET_MAX_DATE'; date: Date }
  | { type: 'SET_STATUS_FILTER'; status: TransactionStatus }
  | { type: 'CLEAR_STATUS_FILTER' }
  | { type: 'CLEAR_DATE_FILTERS' };

export type FilterState = {
  dispatch: FilterDispatch;
  filterCount: number;
  minDate: Date;
  maxDate: Date;
  minDateIsSet: boolean;
  maxDateIsSet: boolean;
  statusFilter: string;
};

export const useFilterReducer = () =>
  useReducer(
    (prevState: FilterState, action: FilterAction) => {
      let count = prevState.filterCount;
      let status = 'none';
      switch (action.type) {
        case 'SET_MIN_DATE':
          if (!(prevState.minDateIsSet || prevState.maxDateIsSet)) {
            count += 1;
          }
          return {
            ...prevState,
            filterCount: count,
            minDateIsSet: true,
            minDate: action.date,
          };
        case 'SET_MAX_DATE':
          if (!(prevState.minDateIsSet || prevState.maxDateIsSet)) {
            count += 1;
          }
          return {
            ...prevState,
            filterCount: count,
            maxDateIsSet: true,
            maxDate: action.date,
          };
        case 'CLEAR_DATE_FILTERS':
          if (prevState.maxDateIsSet || prevState.minDateIsSet) {
            count -= 1;
          }
          return {
            ...prevState,
            filterCount: count,
            minDateIsSet: false,
            maxDateIsSet: false,
            minDate: now,
            maxDate: now,
          };
        case 'SET_STATUS_FILTER':
          if (prevState.statusFilter === 'none') {
            count += 1;
          }
          if (prevState.statusFilter !== action.status) {
            status = action.status;
          } else {
            count -= 1;
          }
          return {
            ...prevState,
            filterCount: count,
            statusFilter: status,
          };
        case 'CLEAR_STATUS_FILTER':
          if (prevState.statusFilter !== 'none') {
            count -= 1;
          }
          return {
            ...prevState,
            filterCount: count,
            statusFilter: 'none',
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
      statusFilter: 'none',
      dispatch: () => null,
    },
  );

export type SortDispatch = React.Dispatch<number>;

export type SortState = {
  dispatch: SortDispatch;
  sortedArray: Transaction[];
};
