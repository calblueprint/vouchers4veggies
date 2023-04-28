import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { ScanningDispatch } from '../screens/scanning/ScanningContext';
import { ScannerStackParamList } from '../navigation/types';

/** Reset all variables and start a new invoice */
export const newInvoice = (dispatch: ScanningDispatch) =>
  dispatch({ type: 'NEW_INVOICE' });

/** Creates a voucher object and adds it to the voucher map */
export const addVoucher = (
  dispatch: ScanningDispatch,
  serialNumber: number,
  voucherAmount: number,
  voucherType: string,
) =>
  dispatch({ type: 'ADD_VOUCHER', serialNumber, voucherAmount, voucherType });

/** Creates multiple voucher objects given a list of serial numbers */
export const addMultipleVouchers = (
  dispatch: ScanningDispatch,
  serialNumberArray: Array<number>,
  voucherAmount: number,
  voucherType: string,
) => {
  for (let i = 0; i < serialNumberArray.length; i += 1) {
    addVoucher(dispatch, serialNumberArray[i], voucherAmount, voucherType);
  }
};

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

/** Declares prop types for usePreventLeave */
type PreventLeaveProps = {
  hasUnsavedChanges: boolean;
  navigation: NativeStackNavigationProp<
    ScannerStackParamList,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  dispatch: ScanningDispatch;
};

/** Event handler that prevents user from leaving screen if there are unsaved changes */
export const handlePreventLeave = ({
  hasUnsavedChanges,
  navigation,
  dispatch,
}: PreventLeaveProps) => {
  if (hasUnsavedChanges) {
    // Prompt the user before leaving the screen
    Alert.alert(
      'Discard changes?',
      'You have unsaved changes. Are you sure to discard them and leave the screen?',
      [
        {
          text: "Don't leave",
          style: 'cancel',
          onPress: () => {
            // Do nothing
          },
        },
        {
          text: 'Discard',
          style: 'destructive',
          // If the user confirms, then we reset the Transaction
          onPress: () => {
            newInvoice(dispatch);
            navigation.navigate('VoucherEntryStartScreen');
          },
        },
      ],
    );
  } else {
    Alert.alert('Exit?', "Are you sure you don't want to enter any vouchers?", [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {
          // Do nothing
        },
      },
      {
        text: 'Exit',
        style: 'destructive',
        onPress: () => {
          navigation.navigate('VoucherEntryStartScreen');
        },
      },
    ]);
  }
};

/** Displays a toast on successful voucher entry */
export const showSuccessToast = () => {
  Toast.show({
    type: 'success',
    position: 'top',
    topOffset: 50,
    text1: 'Voucher Added!', // TODO: @sauhardjain Change text styling to increase visibility
    visibilityTime: 2000,
  });
};

/** Displays a toast when all vouchers in a range are added successfully */
export const multipleVoucherSuccessToast = () => {
  Toast.show({
    type: 'success',
    position: 'top',
    topOffset: 50,
    text1: 'All Vouchers Added!',
    visibilityTime: 2000,
  });
};

/** Displays an error toast if not all vouchers are added successfully */
export const partialSuccessVoucherToast = (success: number, total: number) => {
  Toast.show({
    type: 'error',
    position: 'top',
    topOffset: 50,
    text1: `${success}/${total} Vouchers Successfully Added!`, // TODO: @sauhardjain Change text styling to increase visibility
    visibilityTime: 2000,
  });
};
