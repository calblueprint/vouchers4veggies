import React, { createContext, useContext, useMemo, useReducer } from 'react';

export type ScanningDispatch = React.Dispatch<ScanningContextAction>;

type voucherData = {
  type: string;
  value: number;
};

type ScanningState = {
  voucherMap: Map<number, voucherData>;
  dispatch: ScanningDispatch;
};

type ScanningContextAction =
  | { type: 'TEST' }
  | { type: 'NEW_INVOICE' }
  | {
      type: 'ADD_VOUCHER';
      serialNumber: number;
      voucherValue: number;
      voucherType: string;
    }
  | { type: 'EDIT_VOUCHER'; serialNumber: number; voucherValue: number }
  | { type: 'DELETE_VOUCHER'; serialNumber: number };

const deleteVoucherHelper = (
  prevMap: Map<number, voucherData>,
  serialNumber: number,
) => {
  prevMap.delete(serialNumber);
  return prevMap;
};

const editVoucherHelper = (
  prevMap: Map<number, voucherData>,
  serialNumber: number,
  newValue: number,
) => {
  const type = prevMap.get(serialNumber)?.type;
  if (prevMap !== undefined && type !== undefined) {
    prevMap.set(serialNumber, {
      value: newValue,
      type,
    });
  }
  return prevMap;
};

const useScanningReducer = () =>
  useReducer(
    (prevState: ScanningState, action: ScanningContextAction) => {
      switch (action.type) {
        case 'TEST':
          return {
            ...prevState,
          };
        case 'NEW_INVOICE':
          return {
            voucherMap: new Map<number, voucherData>(),
            dispatch: () => null,
          };
        case 'ADD_VOUCHER':
          return {
            ...prevState,
            voucherMap: new Map(
              prevState.voucherMap.set(action.serialNumber, {
                value: action.voucherValue,
                type: action.voucherType,
              }),
            ),
          };
        case 'EDIT_VOUCHER':
          return {
            ...prevState,
            voucherMap: new Map(
              editVoucherHelper(
                prevState.voucherMap,
                action.serialNumber,
                action.voucherValue,
              ),
            ),
          };
        case 'DELETE_VOUCHER':
          return {
            ...prevState,
            voucherMap: new Map(
              deleteVoucherHelper(prevState.voucherMap, action.serialNumber),
            ),
          };
        default:
          return prevState;
      }
    },
    {
      voucherMap: new Map<number, voucherData>(),
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
