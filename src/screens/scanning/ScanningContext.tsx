import React, { createContext, useContext, useMemo, useReducer } from 'react';

export type ScanningDispatch = React.Dispatch<ScanningContextAction>;

type ScanningState = {
  isEmpty: boolean;
  voucherMap: Map<number, number>;
  dispatch: ScanningDispatch;
};

type ScanningContextAction =
  | { type: 'TEST' }
  | { type: 'ADD_VOUCHER'; serialNumber: number; voucherAmount: number }
  | { type: 'DELETE_VOUCHER'; serialNumber: number };

const useScanningReducer = () =>
  useReducer(
    (prevState: ScanningState, action: ScanningContextAction) => {
      switch (action.type) {
        case 'TEST':
          return {
            ...prevState,
            isEmpty: false,
          };
        case 'ADD_VOUCHER':
          return {
            ...prevState,
            isEmpty: false,
          };
        case 'DELETE_VOUCHER':
          return {
            ...prevState,
          };
        default:
          return prevState;
      }
    },
    {
      isEmpty: true,
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
