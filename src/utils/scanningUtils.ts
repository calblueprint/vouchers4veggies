import { useEffect } from 'react';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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

/** Declares prop types for usePreventLeave */
type PreventLeaveProps = {
  hasUnsavedChanges: boolean;
  navigation: NativeStackNavigationProp<
    ScannerStackParamList,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentScreen: any;
  dispatch: ScanningDispatch;
};

/** Creates a custom Hook that prevents user from leaving screen if there are unsaved changes */
export const usePreventLeave = ({
  hasUnsavedChanges,
  navigation,
  currentScreen,
  dispatch,
}: PreventLeaveProps) => {
  useEffect(
    () =>
      navigation.addListener('beforeRemove', () => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            {
              text: "Don't leave",
              style: 'cancel',
              onPress: () => {
                navigation.navigate(currentScreen);
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
      }),
    [hasUnsavedChanges, navigation, currentScreen, dispatch],
  );
};
