import { useReducer } from 'react';
import { TransactionStatus, Transaction, Voucher } from '../types/types';

type SortAction =
  | { type: 'SORT_BY'; option: number }
  | { type: 'ON_SUBMIT' }
  | { type: 'ON_RELOAD' }
  | { type: 'RESET_IN_PROGRESS' };

export type SortVoucherDispatch = React.Dispatch<SortAction>;

export enum SortVoucherOption {
  NO_SORT = -1,
  SERIAL_NUMBER_DESC,
  SERIAL_NUMBER_ASC,
  DATE_DESC,
  DATE_ASC,
}

export type SortVoucherState = {
  dispatch: SortVoucherDispatch;
  isActive: boolean;
  sortType: SortVoucherOption;
  inProgressSortType: SortVoucherOption;
};

export const useSortVoucherReducer = (
  vouchers: Voucher[],
  defaultVouchers: Voucher[],
  setVouchers: (array: Voucher[]) => void,
) => {
  const sortVouchersBySerialNumberAsc = (data: Voucher[]) => {
    const dataCopy = [...data];
    const sortedArray = dataCopy.sort(
      (a, b) => a.serialNumber - b.serialNumber,
    );
    return sortedArray;
  };

  const sortVouchersBySerialNumberDesc = (data: Voucher[]) => {
    const dataCopy = [...data];
    const sortedArray = dataCopy.sort(
      (a, b) => b.serialNumber - a.serialNumber,
    );
    return sortedArray;
  };

  const sortVouchersByDateDesc = () => [...defaultVouchers];

  const sortVouchersByDateAsc = () => [...defaultVouchers].reverse();

  const [sortVoucherState, sortVoucherDispatch] = useReducer(
    (prevState: SortVoucherState, action: SortAction) => {
      let sortedArray = vouchers;
      switch (action.type) {
        case 'SORT_BY':
          return {
            ...prevState,
            inProgressSortType: action.option,
          };
        case 'ON_SUBMIT':
          switch (prevState.inProgressSortType) {
            case SortVoucherOption.DATE_ASC:
              sortedArray = sortVouchersByDateAsc();
              break;
            case SortVoucherOption.SERIAL_NUMBER_DESC:
              sortedArray = sortVouchersBySerialNumberDesc(vouchers);
              break;
            case SortVoucherOption.SERIAL_NUMBER_ASC:
              sortedArray = sortVouchersBySerialNumberAsc(vouchers);
              break;
            default:
              sortedArray = sortVouchersByDateDesc();
          }
          setVouchers(sortedArray);
          return {
            ...prevState,
            isActive: true,
            sortType: prevState.inProgressSortType,
          };
        case 'ON_RELOAD':
          switch (prevState.sortType) {
            case SortVoucherOption.DATE_ASC:
              sortedArray = sortVouchersByDateAsc();
              break;
            case SortVoucherOption.SERIAL_NUMBER_DESC:
              sortedArray = sortVouchersBySerialNumberDesc(vouchers);
              break;
            case SortVoucherOption.SERIAL_NUMBER_ASC:
              sortedArray = sortVouchersBySerialNumberAsc(vouchers);
              break;
            default:
              sortedArray = sortVouchersByDateDesc();
          }
          setVouchers(sortedArray);
          return {
            ...prevState,
          };
        case 'RESET_IN_PROGRESS':
          return {
            ...prevState,
            inProgressSortType: prevState.sortType,
          };
        default:
          return {
            ...prevState,
          };
      }
    },
    {
      isActive: false,
      sortType: SortVoucherOption.NO_SORT,
      inProgressSortType: SortVoucherOption.NO_SORT,
      dispatch: () => null,
    },
  );

  return { sortVoucherState, sortVoucherDispatch };
};

export type SortTransactionDispatch = React.Dispatch<SortAction>;

export enum SortTransactionOption {
  NO_SORT = -1,
  AMOUNT_DESC,
  AMOUNT_ASC,
  DATE_DESC,
  DATE_ASC,
}

export type SortTransactionState = {
  dispatch: SortTransactionDispatch;
  isActive: boolean;
  sortType: SortTransactionOption;
  inProgressSortType: SortTransactionOption;
};

export const useSortTransactionReducer = (
  transactions: Transaction[],
  setTransactions: (array: Transaction[]) => void,
) => {
  const sortTransactionsByAmountDesc = (data: Transaction[]) => {
    const dataCopy = [...data];
    const sortedArray = dataCopy.sort((a, b) => b.value - a.value);
    return sortedArray;
  };

  const sortTransactionsByAmountAsc = (data: Transaction[]) => {
    const dataCopy = [...data];
    const sortedArray = dataCopy.sort((a, b) => a.value - b.value);
    return sortedArray;
  };

  const sortTransactionsByDateDesc = (data: Transaction[]) => {
    const dataCopy = [...data];
    const sortedArray = dataCopy.sort(
      (a, b) => b.timestamp.seconds - a.timestamp.seconds,
    );
    return sortedArray;
  };

  const sortTransactionsByDateAsc = (data: Transaction[]) => {
    const dataCopy = [...data];
    const sortedArray = dataCopy.sort(
      (a, b) => a.timestamp.seconds - b.timestamp.seconds,
    );
    return sortedArray;
  };

  const [sortTransactionState, sortTransactionDispatch] = useReducer(
    (prevState: SortTransactionState, action: SortAction) => {
      let sortedArray = transactions;
      switch (action.type) {
        case 'SORT_BY':
          return {
            ...prevState,
            inProgressSortType: action.option,
          };
        case 'ON_SUBMIT':
          switch (prevState.inProgressSortType) {
            case SortTransactionOption.NO_SORT:
              return { ...prevState };
            case SortTransactionOption.DATE_ASC:
              sortedArray = sortTransactionsByDateAsc(transactions);
              break;
            case SortTransactionOption.AMOUNT_ASC:
              sortedArray = sortTransactionsByAmountAsc(transactions);
              break;
            case SortTransactionOption.AMOUNT_DESC:
              sortedArray = sortTransactionsByAmountDesc(transactions);
              break;
            default:
              sortedArray = sortTransactionsByDateDesc(transactions);
          }
          setTransactions(sortedArray);
          return {
            ...prevState,
            isActive: true,
            sortType: prevState.inProgressSortType,
          };
        case 'ON_RELOAD':
          switch (prevState.sortType) {
            case SortTransactionOption.DATE_ASC:
              sortedArray = sortTransactionsByDateAsc(transactions);
              break;
            case SortTransactionOption.AMOUNT_ASC:
              sortedArray = sortTransactionsByAmountAsc(transactions);
              break;
            case SortTransactionOption.AMOUNT_DESC:
              sortedArray = sortTransactionsByAmountDesc(transactions);
              break;
            default:
              sortedArray = sortTransactionsByDateDesc(transactions);
          }
          setTransactions(sortedArray);
          return prevState;
        case 'RESET_IN_PROGRESS':
          return {
            ...prevState,
            inProgressSortType: prevState.sortType,
          };
        default:
          return {
            ...prevState,
          };
      }
    },
    {
      isActive: false,
      sortType: SortTransactionOption.NO_SORT,
      inProgressSortType: SortTransactionOption.NO_SORT,
      dispatch: () => null,
    },
  );

  return {
    sortTransactionState,
    sortTransactionDispatch,
  };
};

const now = new Date();

export type FilterDispatch = React.Dispatch<FilterAction>;

type FilterAction =
  | { type: 'SET_MIN_DATE'; date: Date }
  | { type: 'SET_MAX_DATE'; date: Date }
  | { type: 'SET_AMOUNT'; minAmount: number; maxAmount: number | null }
  | { type: 'SET_STATUS_FILTER'; status: TransactionStatus }
  | { type: 'CLEAR_DATE_FILTERS' }
  | { type: 'CLEAR_STATUS_FILTER' }
  | { type: 'CLEAR_AMOUNT_FILTERS' }
  | { type: 'ON_SUBMIT' }
  | { type: 'ON_RELOAD' }
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
      const oneDay = 24 * 3600 * 1000;
      minTime = filterState.inProgressMinDate.getTime() - oneDay;
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
      const status = 'none';
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
          return {
            ...prevState,
            inProgressFilterCount: count,
            inProgressStatusFilter: action.status,
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
        case 'SET_AMOUNT':
          if (
            !(
              prevState.inProgressMinAmountIsSet ||
              prevState.inProgressMaxAmountIsSet
            )
          ) {
            count += 1;
          }
          if (action.maxAmount) {
            newState.inProgressMaxAmountIsSet = true;
            newState.inProgressMaxAmount = action.maxAmount;
          } else {
            newState.inProgressMaxAmountIsSet = false;
          }
          return {
            ...newState,
            inProgressFilterCount: count,
            inProgressMinAmountIsSet: true,
            inProgressMinAmount: action.minAmount,
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
        case 'ON_RELOAD':
          if (prevState.minDateIsSet || prevState.maxDateIsSet) {
            transactions = filterByDate(prevState, transactions);
          }
          if (prevState.statusFilter !== 'none') {
            transactions = filterByStatus(prevState, transactions);
          }
          if (prevState.minAmountIsSet || prevState.maxAmountIsSet) {
            transactions = filterByAmount(prevState, transactions);
          }
          setTransactions(transactions);
          return prevState;
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
