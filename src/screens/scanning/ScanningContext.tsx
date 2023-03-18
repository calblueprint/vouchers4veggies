import React, { createContext, useContext, useMemo, useReducer } from 'react';

export type ScanningDispatch = React.Dispatch<ScanningContextAction>;

type ScanningState = {
  isEmpty: boolean;
  tempSerialNumber: number;
  voucherMap: Map<number, number>;
  dispatch: ScanningDispatch;
};

type ScanningContextAction =
  | { type: 'TEST' }
  | { type: 'ADD_SERIAL_NUMBER'; serialNumber: number }
  | { type: 'ADD_VOUCHER'; voucherAmount: number };

const useScanningReducer = () =>
  useReducer(
    (prevState: ScanningState, action: ScanningContextAction) => {
      switch (action.type) {
        case 'TEST':
          return {
            ...prevState,
            isEmpty: false,
          };
        case 'ADD_SERIAL_NUMBER':
          return {
            ...prevState,
            tempSerialNumber: action.serialNumber,
          };
        case 'ADD_VOUCHER':
          return {
            ...prevState,
            isEmpty: false,
            voucherMap: new Map(
              prevState.voucherMap.set(
                prevState.tempSerialNumber,
                action.voucherAmount,
              ),
            ),
          };
        default:
          return prevState;
      }
    },
    {
      isEmpty: true,
      tempSerialNumber: 0,
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
