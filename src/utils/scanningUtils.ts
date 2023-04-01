import { ScanningDispatch } from '../screens/scanning/ScanningContext';

/** Reset all variables and start a new invoice */
export const newInvoice = (dispatch: ScanningDispatch) =>
  dispatch({ type: 'NEW_INVOICE' });

/** Creates a voucher object and adds it to the voucher map */
export const addVoucher = (
  dispatch: ScanningDispatch,
  serialNumber: number,
  voucherAmount: number,
) => dispatch({ type: 'ADD_VOUCHER', serialNumber, voucherAmount });

/** Update a voucher object in the voucher map */
export const editVoucher = (
  dispatch: ScanningDispatch,
  serialNumber: number,
  voucherAmount: number,
) => dispatch({ type: 'EDIT_VOUCHER', serialNumber, voucherAmount });

/** Delete a voucher object from the voucher map */
export const deleteVoucher = (
  dispatch: ScanningDispatch,
  serialNumber: number,
) => dispatch({ type: 'DELETE_VOUCHER', serialNumber });

/** Tests that ScanningContext is working properly by undisabling buttons */
export const testContext = (dispatch: ScanningDispatch) => {
  dispatch({ type: 'TEST' });
};
