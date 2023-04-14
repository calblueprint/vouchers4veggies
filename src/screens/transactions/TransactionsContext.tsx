import { useReducer } from 'react';
import { Transaction, TransactionStatus } from '../../types/types';

const now = new Date();

export type FilterDispatch = React.Dispatch<FilterAction>;

type FilterAction =
  | { type: 'SET_MIN_DATE'; date: Date }
  | { type: 'SET_MAX_DATE'; date: Date }
  | { type: 'SET_MIN_AMOUNT'; amount: number }
  | { type: 'SET_MAX_AMOUNT'; amount: number }
  | { type: 'SET_STATUS_FILTER'; status: TransactionStatus }
  | { type: 'CLEAR_DATE_FILTERS' }
  | { type: 'CLEAR_STATUS_FILTER' }
  | { type: 'CLEAR_AMOUNT_FILTERS' };

export type FilterState = {
  dispatch: FilterDispatch;
  filterCount: number;
  minDate: Date;
  maxDate: Date;
  minDateIsSet: boolean;
  maxDateIsSet: boolean;
  statusFilter: string;
  minAmount: number;
  maxAmount: number;
  minAmountIsSet: boolean;
  maxAmountIsSet: boolean;
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
        case 'SET_MIN_AMOUNT':
          if (!(prevState.minAmountIsSet || prevState.maxAmountIsSet)) {
            count += 1;
          }
          return {
            ...prevState,
            filterCount: count,
            minAmountIsSet: true,
            minAmount: action.amount,
          };
        case 'SET_MAX_AMOUNT':
          if (!(prevState.minAmountIsSet || prevState.maxAmountIsSet)) {
            count += 1;
          }
          return {
            ...prevState,
            filterCount: count,
            maxAmountIsSet: true,
            maxAmount: action.amount,
          };
        case 'CLEAR_AMOUNT_FILTERS':
          if (prevState.minAmountIsSet || prevState.maxAmountIsSet) {
            count -= 1;
          }
          return {
            ...prevState,
            filterCount: count,
            minAmountIsSet: false,
            maxAmountIsSet: false,
            minAmount: 0,
            maxAmount: 0,
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
      minAmount: 0,
      maxAmount: 0,
      minAmountIsSet: false,
      maxAmountIsSet: false,
      dispatch: () => null,
    },
  );

export type SortDispatch = React.Dispatch<number>;

export type SortState = {
  dispatch: SortDispatch;
  sortedArray: Transaction[];
};
