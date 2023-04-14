import { useReducer } from 'react';
import { Transaction } from '../types/types';

export type SortDispatch = React.Dispatch<SortAction>;

export enum SortOption {
  NO_SORT = -1,
  SELECT_DATE_ASC,
  SELECT_DATE_DESC,
  SELECT_AMOUNT_ASC,
  SELECT_AMOUNT_DESC,
}

type SortAction =
  | { type: 'SORT_BY'; option: number }
  | { type: 'ON_SUBMIT' }
  | { type: 'ON_RELOAD' }
  | { type: 'RESET_IN_PROGRESS' };

export type SortState = {
  dispatch: SortDispatch;
  isActive: boolean;
  sortType: SortOption;
  inProgressSortType: SortOption;
};

export const useSortReducer = (
  transactions: Transaction[],
  setTransactions: (array: Transaction[]) => void,
) => {
  const sortByAmountDesc = (data: Transaction[]) => {
    const sortedArray = data.sort((a, b) => b.value - a.value);
    return sortedArray;
  };

  const sortByAmountAsc = (data: Transaction[]) => {
    const sortedArray = data.sort((a, b) => a.value - b.value);
    return sortedArray;
  };

  const sortByDateDesc = (data: Transaction[]) => {
    const sortedArray = data.sort(
      (a, b) => b.timestamp.seconds - a.timestamp.seconds,
    );
    return sortedArray;
  };

  const sortByDateAsc = (data: Transaction[]) => {
    const sortedArray = data.sort(
      (a, b) => a.timestamp.seconds - b.timestamp.seconds,
    );
    return sortedArray;
  };

  const [sortState, sortDispatch] = useReducer(
    (prevState: SortState, action: SortAction) => {
      let sortedArray = transactions;
      switch (action.type) {
        case 'SORT_BY':
          return {
            ...prevState,
            inProgressSortType: action.option,
          };
        case 'ON_SUBMIT':
          switch (prevState.inProgressSortType) {
            case SortOption.SELECT_DATE_ASC:
              sortedArray = sortByDateAsc(transactions);
              break;
            case SortOption.SELECT_AMOUNT_ASC:
              sortedArray = sortByAmountAsc(transactions);
              break;
            case SortOption.SELECT_AMOUNT_DESC:
              sortedArray = sortByAmountDesc(transactions);
              break;
            default:
              sortedArray = sortByDateDesc(transactions);
          }
          setTransactions(sortedArray);
          return {
            ...prevState,
            isActive: true,
            sortType: prevState.inProgressSortType,
          };
        case 'ON_RELOAD':
          switch (prevState.sortType) {
            case SortOption.SELECT_DATE_ASC:
              sortedArray = sortByDateAsc(transactions);
              break;
            case SortOption.SELECT_AMOUNT_ASC:
              sortedArray = sortByAmountAsc(transactions);
              break;
            case SortOption.SELECT_AMOUNT_DESC:
              sortedArray = sortByAmountDesc(transactions);
              break;
            default:
              sortedArray = sortByDateDesc(transactions);
          }
          setTransactions(sortedArray);
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
      sortType: SortOption.NO_SORT,
      inProgressSortType: SortOption.NO_SORT,
      dispatch: () => null,
    },
  );

  return { sortState, sortDispatch };
};
