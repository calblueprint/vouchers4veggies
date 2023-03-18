import { ScanningDispatch } from '../screens/scanning/ScanningContext';

/** Creates a voucher object and adds it to the voucher map */
export const addVoucher = (
  dispatch: ScanningDispatch,
  serialNumber: number,
  voucherAmount: number,
) => dispatch({ type: 'ADD_VOUCHER', serialNumber, voucherAmount });

/** Tests that ScanningContext is working properly by undisabling buttons */
export const testContext = (dispatch: ScanningDispatch) => {
  dispatch({ type: 'TEST' });
};
