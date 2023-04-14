import { useReducer } from 'react';
import { Transaction, TransactionStatus } from '../types/types';

export type SortDispatch = React.Dispatch<number>;

export type SortState = {
  dispatch: SortDispatch;
  sortedArray: Transaction[];
};
