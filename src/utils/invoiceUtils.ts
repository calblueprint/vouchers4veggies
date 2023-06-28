import { useReducer } from 'react';
import { InvoiceStatus, Invoice, Voucher } from '../types/types';

type SortAction =
  | { type: 'SORT_BY'; option: number }
  | { type: 'CLEAR_SORT' }
  | { type: 'ON_SUBMIT' }
  | { type: 'ON_RELOAD' }
  | { type: 'RESET_IN_PROGRESS' };

export type SortDispatch = React.Dispatch<SortAction>;

export enum SortVoucherOption {
  NO_SORT = -1,
  SERIAL_NUMBER_DESC,
  SERIAL_NUMBER_ASC,
  DATE_DESC,
  DATE_ASC,
}

export enum SortInvoiceOption {
  NO_SORT = -1,
  AMOUNT_DESC,
  AMOUNT_ASC,
  DATE_DESC,
  DATE_ASC,
}

export type SortState = {
  dispatch: SortDispatch;
  isActive: boolean;
  sortType: SortVoucherOption | SortInvoiceOption;
  inProgressSortType: SortVoucherOption | SortInvoiceOption;
};

const sortVouchersBySerialNumberAsc = (data: Voucher[]) => {
  const dataCopy = [...data];
  const sortedArray = dataCopy.sort((a, b) => a.serialNumber - b.serialNumber);
  return sortedArray;
};

const sortVouchersBySerialNumberDesc = (data: Voucher[]) => {
  const dataCopy = [...data];
  const sortedArray = dataCopy.sort((a, b) => b.serialNumber - a.serialNumber);
  return sortedArray;
};

const sortVouchersByDateDesc = (data: Voucher[]) => [...data];

const sortVouchersByDateAsc = (data: Voucher[]) => [...data].reverse();

const sortInvoicesByAmountDesc = (data: Invoice[]) => {
  const dataCopy = [...data];
  const sortedArray = dataCopy.sort((a, b) => b.value - a.value);
  return sortedArray;
};

const sortInvoicesByAmountAsc = (data: Invoice[]) => {
  const dataCopy = [...data];
  const sortedArray = dataCopy.sort((a, b) => a.value - b.value);
  return sortedArray;
};

const sortInvoicesByDateDesc = (data: Invoice[]) => {
  const dataCopy = [...data];
  const sortedArray = dataCopy.sort(
    (a, b) => b.timestamp.seconds - a.timestamp.seconds,
  );
  return sortedArray;
};

const sortInvoicesByDateAsc = (data: Invoice[]) => {
  const dataCopy = [...data];
  const sortedArray = dataCopy.sort(
    (a, b) => a.timestamp.seconds - b.timestamp.seconds,
  );
  return sortedArray;
};

export const useSortReducer = (
  type: 'vouchers' | 'invoices',
  voucherArray?: Voucher[],
  defaultVoucherArray?: Voucher[],
  setVoucherArray?: (array: Voucher[]) => void,
  invoiceArray?: Invoice[],
  setInvoiceArray?: (array: Invoice[]) => void,
) => {
  const [sortState, sortDispatch] = useReducer(
    (prevState: SortState, action: SortAction) => {
      switch (action.type) {
        case 'SORT_BY':
          return {
            ...prevState,
            inProgressSortType: action.option,
          };
        case 'CLEAR_SORT':
          return {
            ...prevState,
            isActive: false,
            sortType: SortVoucherOption.NO_SORT,
            inProgressSortType: SortVoucherOption.NO_SORT,
          };
        case 'ON_SUBMIT':
          if (type === 'vouchers' && voucherArray && setVoucherArray) {
            let sortedArray = voucherArray;
            switch (prevState.inProgressSortType) {
              case SortInvoiceOption.NO_SORT:
                return { ...prevState };
              case SortVoucherOption.DATE_ASC:
                if (defaultVoucherArray)
                  sortedArray = sortVouchersByDateAsc(defaultVoucherArray);
                break;
              case SortVoucherOption.SERIAL_NUMBER_DESC:
                sortedArray = sortVouchersBySerialNumberDesc(voucherArray);
                break;
              case SortVoucherOption.SERIAL_NUMBER_ASC:
                sortedArray = sortVouchersBySerialNumberAsc(voucherArray);
                break;
              default:
                if (defaultVoucherArray)
                  sortedArray = sortVouchersByDateDesc(defaultVoucherArray);
            }
            setVoucherArray(sortedArray);
          } else if (type === 'invoices' && setInvoiceArray && invoiceArray) {
            let sortedArray = invoiceArray;
            switch (prevState.inProgressSortType) {
              case SortInvoiceOption.NO_SORT:
                return { ...prevState };
              case SortInvoiceOption.DATE_ASC:
                sortedArray = sortInvoicesByDateAsc(invoiceArray);
                break;
              case SortInvoiceOption.AMOUNT_ASC:
                sortedArray = sortInvoicesByAmountAsc(invoiceArray);
                break;
              case SortInvoiceOption.AMOUNT_DESC:
                sortedArray = sortInvoicesByAmountDesc(invoiceArray);
                break;
              default:
                sortedArray = sortInvoicesByDateDesc(invoiceArray);
            }
            setInvoiceArray(sortedArray);
          }
          return {
            ...prevState,
            isActive: true,
            sortType: prevState.inProgressSortType,
          };
        case 'ON_RELOAD':
          if (type === 'vouchers' && voucherArray && setVoucherArray) {
            let sortedArray = voucherArray;
            switch (prevState.sortType) {
              case SortVoucherOption.DATE_ASC:
                if (defaultVoucherArray)
                  sortedArray = sortVouchersByDateAsc(defaultVoucherArray);
                break;
              case SortVoucherOption.SERIAL_NUMBER_DESC:
                sortedArray = sortVouchersBySerialNumberDesc(voucherArray);
                break;
              case SortVoucherOption.SERIAL_NUMBER_ASC:
                sortedArray = sortVouchersBySerialNumberAsc(voucherArray);
                break;
              default:
                if (defaultVoucherArray)
                  sortedArray = sortVouchersByDateDesc(defaultVoucherArray);
            }
            setVoucherArray(sortedArray);
          } else if (type === 'invoices' && setInvoiceArray && invoiceArray) {
            let sortedArray = invoiceArray;
            switch (prevState.sortType) {
              case SortInvoiceOption.DATE_ASC:
                sortedArray = sortInvoicesByDateAsc(invoiceArray);
                break;
              case SortInvoiceOption.AMOUNT_ASC:
                sortedArray = sortInvoicesByAmountAsc(invoiceArray);
                break;
              case SortInvoiceOption.AMOUNT_DESC:
                sortedArray = sortInvoicesByAmountDesc(invoiceArray);
                break;
              default:
                sortedArray = sortInvoicesByDateDesc(invoiceArray);
            }
            setInvoiceArray(sortedArray);
            return prevState;
          }
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

  return { sortState, sortDispatch };
};

const now = new Date();

export type FilterDispatch = React.Dispatch<FilterAction>;

type FilterAction =
  | { type: 'SET_MIN_DATE'; date: Date }
  | { type: 'SET_MAX_DATE'; date: Date }
  | { type: 'SET_AMOUNT'; minAmount: number; maxAmount: number | null }
  | { type: 'SET_STATUS_FILTER'; status: InvoiceStatus }
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
  defaultInvoices: Invoice[],
  setInvoices: (array: Invoice[]) => void,
) => {
  const filterByDate = (filterState: FilterState, array: Invoice[]) => {
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

  const filterByStatus = (filterState: FilterState, array: Invoice[]) => {
    const filteredArray = array?.filter(
      t => t.status === filterState.statusFilter,
    );
    return filteredArray;
  };

  const filterByAmount = (filterState: FilterState, array: Invoice[]) => {
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
      let newState = { ...prevState };
      let invoices = [...defaultInvoices];

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
            invoices = filterByDate(prevState, invoices);
          }
          if (prevState.statusFilter !== 'none') {
            invoices = filterByStatus(prevState, invoices);
          }
          if (prevState.minAmountIsSet || prevState.maxAmountIsSet) {
            invoices = filterByAmount(prevState, invoices);
          }
          setInvoices(invoices);
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
            invoices = filterByDate(newState, invoices);
          }
          if (newState.statusFilter !== 'none') {
            invoices = filterByStatus(newState, invoices);
          }
          if (newState.minAmountIsSet || newState.maxAmountIsSet) {
            invoices = filterByAmount(newState, invoices);
          }
          setInvoices(invoices);
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
