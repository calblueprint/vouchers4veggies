import React, { createContext, useContext, useMemo, useReducer } from 'react';

export type ScanningDispatch = React.Dispatch<ScanningContextAction>;

type ScanningState = {
  voucherMap: Map<number, number>;
  dispatch: ScanningDispatch;
};

type ScanningContextAction =
  | { type: 'TEST' }
  | { type: 'ADD_VOUCHER'; serialNumber: number; voucherAmount: number }
  | { type: 'EDIT_VOUCHER'; serialNumber: number; voucherAmount: number }
  | { type: 'DELETE_VOUCHER'; serialNumber: number };

const deleteVoucherHelper = (
  prevMap: Map<number, number>,
  serialNumber: number,
) => {
  prevMap.delete(serialNumber);
  return prevMap;
};

const isEmptyAfterDelete = (prevMap: Map<number, number>) =>
  prevMap.size - 1 > 0;

const useScanningReducer = () =>
  useReducer(
    (prevState: ScanningState, action: ScanningContextAction) => {
      switch (action.type) {
        case 'TEST':
          return {
            ...prevState,
          };
        case 'ADD_VOUCHER':
          return {
            ...prevState,
            voucherMap: new Map(
              prevState.voucherMap.set(
                action.serialNumber,
                action.voucherAmount,
              ),
            ),
          };
        case 'EDIT_VOUCHER':
          return {
            ...prevState,
            voucherMap: new Map(
              prevState.voucherMap.set(
                action.serialNumber,
                action.voucherAmount,
              ),
            ),
          };
        case 'DELETE_VOUCHER':
          return {
            ...prevState,
            isEmpty: isEmptyAfterDelete(prevState.voucherMap),
            voucherMap: new Map(
              deleteVoucherHelper(prevState.voucherMap, action.serialNumber),
            ),
          };
        default:
          return prevState;
      }
    },
    {
      voucherMap: new Map<number, number>(),
      dispatch: () => null,
    },
  );

const ScanningContext = createContext<ScanningState>({} as ScanningState);

ScanningContext.displayName = 'ScanningContext';

export const useScanningContext = () => useContext(ScanningContext);

export function ScanningContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scanningState, dispatch] = useScanningReducer();

  const ScanningContextValue = useMemo(
    () => ({
      ...scanningState,
      dispatch,
    }),
    [scanningState, dispatch],
  );

  return (
    <ScanningContext.Provider value={ScanningContextValue}>
      {children}
    </ScanningContext.Provider>
  );
}
