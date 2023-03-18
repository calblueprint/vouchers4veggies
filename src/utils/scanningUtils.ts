import { ScanningDispatch } from '../screens/scanning/ScanningContext';

// eslint-disable-next-line import/prefer-default-export
// export const addVoucher = (
//   dispatch: ScanningDispatch,
//   serialNumber: number,
//   voucherAmount: number,
// ) => dispatch({ type: 'ADD_VOUCHER', serialNumber, voucherAmount });

/** Tests that ScanningContext is working properly by undisabling buttons */
// eslint-disable-next-line import/prefer-default-export
export const testContext = (dispatch: ScanningDispatch) => {
  dispatch({ type: 'TEST' });
};
