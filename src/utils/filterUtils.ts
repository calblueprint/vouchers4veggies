import { useReducer } from 'react';
import { Transaction, TransactionStatus } from '../types/types';

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
  | { type: 'CLEAR_AMOUNT_FILTERS' }
  | { type: 'ON_SUBMIT' }
  | { type: 'RESET_IN_PROGRESS' };

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
  inProgressFilterCount: number;
  inProgressMinDate: Date;
  inProgressMaxDate: Date;
  inProgressMinDateIsSet: boolean;
  inProgressMaxDateIsSet: boolean;
  inProgressStatusFilter: string;
  inProgressMinAmount: number;
  inProgressMaxAmount: number;
  inProgressMinAmountIsSet: boolean;
  inProgressMaxAmountIsSet: boolean;
};

export const useFilterReducer = (
  defaultTransactions: Transaction[],
  setTransactions: (array: Transaction[]) => void,
) => {
  const filterByDate = (filterState: FilterState, array: Transaction[]) => {
    let minTime = 0;
    if (filterState.inProgressMinDateIsSet) {
      minTime = filterState.inProgressMinDate.getTime();
    }
    const filteredArray = array?.filter(
      t =>
        t.timestamp.seconds * 1000 >= minTime &&
        t.timestamp.seconds * 1000 <= filterState.inProgressMaxDate.getTime(),
    );
    return filteredArray;
  };

  const filterByStatus = (filterState: FilterState, array: Transaction[]) => {
    const filteredArray = array?.filter(
      t => t.status === filterState.statusFilter,
    );
    return filteredArray;
  };

  const filterByAmount = (filterState: FilterState, array: Transaction[]) => {
    let filteredArray = null;
    if (filterState.maxAmountIsSet) {
      filteredArray = array?.filter(
        t =>
          t.value >= filterState.minAmount * 100 &&
          t.value <= filterState.maxAmount * 100,
      );
    } else {
      filteredArray = array?.filter(
        t => t.value >= filterState.minAmount * 100,
      );
    }
    return filteredArray;
  };

  const [filterState, filterDispatch] = useReducer(
    (prevState: FilterState, action: FilterAction) => {
      let count = prevState.inProgressFilterCount;
      let status = 'none';
      let newState = { ...prevState };
      let transactions = [...defaultTransactions];

      switch (action.type) {
        case 'SET_MIN_DATE':
          if (
            !(
              prevState.inProgressMinDateIsSet ||
              prevState.inProgressMaxDateIsSet
            )
          ) {
            count += 1;
          }
          return {
            ...prevState,
            inProgressFilterCount: count,
            inProgressMinDateIsSet: true,
            inProgressMinDate: action.date,
          };
        case 'SET_MAX_DATE':
          if (
            !(
              prevState.inProgressMinDateIsSet ||
              prevState.inProgressMaxDateIsSet
            )
          ) {
            count += 1;
          }
          return {
            ...prevState,
            inProgressFilterCount: count,
            inProgressMaxDateIsSet: true,
            inProgressMaxDate: action.date,
          };
        case 'CLEAR_DATE_FILTERS':
          if (
            prevState.inProgressMaxDateIsSet ||
            prevState.inProgressMinDateIsSet
          ) {
            count -= 1;
          }
          return {
            ...prevState,
            inProgressFilterCount: count,
            inProgressMinDateIsSet: false,
            inProgressMaxDateIsSet: false,
            inProgressMinDate: now,
            inProgressMaxDate: now,
          };
        case 'SET_STATUS_FILTER':
          if (prevState.inProgressStatusFilter === 'none') {
            count += 1;
          }
          if (prevState.inProgressStatusFilter !== action.status) {
            status = action.status;
          } else {
            count -= 1;
          }
          return {
            ...prevState,
            inProgressFilterCount: count,
            inProgressStatusFilter: status,
          };
        case 'CLEAR_STATUS_FILTER':
          if (prevState.inProgressStatusFilter !== 'none') {
            count -= 1;
          }
          return {
            ...prevState,
            inProgressFilterCount: count,
            inProgressStatusFilter: 'none',
          };
        case 'SET_MIN_AMOUNT':
          if (
            !(
              prevState.inProgressMinAmountIsSet ||
              prevState.inProgressMaxAmountIsSet
            )
          ) {
            count += 1;
          }
          return {
            ...prevState,
            inProgressFilterCount: count,
            inProgressMinAmountIsSet: true,
            inProgressMinAmount: action.amount,
          };
        case 'SET_MAX_AMOUNT':
          if (
            !(
              prevState.inProgressMinAmountIsSet ||
              prevState.inProgressMaxAmountIsSet
            )
          ) {
            count += 1;
          }
          return {
            ...prevState,
            inProgressFilterCount: count,
            inProgressMaxAmountIsSet: true,
            inProgressMaxAmount: action.amount,
          };
        case 'CLEAR_AMOUNT_FILTERS':
          if (
            prevState.inProgressMinAmountIsSet ||
            prevState.inProgressMaxAmountIsSet
          ) {
            count -= 1;
          }
          return {
            ...prevState,
            inProgressFilterCount: count,
            inProgressMinAmountIsSet: false,
            inProgressMaxAmountIsSet: false,
            inProgressMinAmount: 0,
            inProgressMaxAmount: 0,
          };
        case 'ON_SUBMIT':
          newState = {
            ...prevState,
            filterCount: prevState.inProgressFilterCount,
            minDate: prevState.inProgressMinDate,
            maxDate: prevState.inProgressMaxDate,
            minDateIsSet: prevState.inProgressMinDateIsSet,
            maxDateIsSet: prevState.inProgressMaxDateIsSet,
            statusFilter: prevState.inProgressStatusFilter,
            minAmount: prevState.inProgressMinAmount,
            maxAmount: prevState.inProgressMaxAmount,
            minAmountIsSet: prevState.inProgressMinAmountIsSet,
            maxAmountIsSet: prevState.inProgressMaxAmountIsSet,
          };

          if (newState.minDateIsSet || newState.maxDateIsSet) {
            transactions = filterByDate(newState, transactions);
          }
          if (newState.statusFilter !== 'none') {
            transactions = filterByStatus(newState, transactions);
          }
          if (newState.minAmountIsSet || newState.maxAmountIsSet) {
            transactions = filterByAmount(newState, transactions);
          }
          setTransactions(transactions);
          return newState;
        case 'RESET_IN_PROGRESS':
          return {
            ...prevState,
            inProgressFilterCount: prevState.filterCount,
            inProgressMinDate: prevState.minDate,
            inProgressMaxDate: prevState.maxDate,
            inProgressMinDateIsSet: prevState.minDateIsSet,
            inProgressMaxDateIsSet: prevState.maxDateIsSet,
            inProgressStatusFilter: prevState.statusFilter,
            inProgressMinAmount: prevState.minAmount,
            inProgressMaxAmount: prevState.maxAmount,
            inProgressMinAmountIsSet: prevState.minAmountIsSet,
            inProgressMaxAmountIsSet: prevState.maxAmountIsSet,
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
      inProgressFilterCount: 0,
      inProgressMinDate: now,
      inProgressMaxDate: now,
      inProgressMinDateIsSet: false,
      inProgressMaxDateIsSet: false,
      inProgressStatusFilter: 'none',
      inProgressMinAmount: 0,
      inProgressMaxAmount: 0,
      inProgressMinAmountIsSet: false,
      inProgressMaxAmountIsSet: false,
      dispatch: () => null,
    },
  );

  return { filterState, filterDispatch };
};

export type SortDispatch = React.Dispatch<number>;

export type SortState = {
  dispatch: SortDispatch;
  sortedArray: Transaction[];
};
