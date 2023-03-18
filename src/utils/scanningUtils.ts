import { ScanningDispatch } from '../screens/scanning/ScanningContext';

/** Adds the Serial Number input to a temporary variable */
export const addSerialNumber = (
  dispatch: ScanningDispatch,
  serialNumber: number,
) => dispatch({ type: 'ADD_SERIAL_NUMBER', serialNumber });

/** Takes voucher amount and creates a new voucher with temporary serial number */
export const addVoucher = (dispatch: ScanningDispatch, voucherAmount: number) =>
  dispatch({ type: 'ADD_VOUCHER', voucherAmount });

/** Tests that ScanningContext is working properly by undisabling buttons */
export const testContext = (dispatch: ScanningDispatch) => {
  dispatch({ type: 'TEST' });
};
