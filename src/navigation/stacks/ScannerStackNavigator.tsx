import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ConfirmationScreen from '../../screens/scanning/ConfirmationScreen';
import ConfirmValueScreen from '../../screens/scanning/ConfirmValueScreen';
import ManualVoucherScreen from '../../screens/scanning/ManualVoucherScreen';
import ReviewScreen from '../../screens/scanning/ReviewScreen';
import { ScanningContextProvider } from '../../screens/scanning/ScanningContext';
import ScanningScreen from '../../screens/scanning/ScanningScreen';
import { ScannerStackParamList } from '../types';
import InvoiceStackNavigator from './InvoiceStackNavigator';
import VoucherEntryStartScreen from '../../screens/scanning/VoucherEntryStartScreen';
import VoucherBatchScreen from '../../screens/scanning/VoucherBatchScreen';
import VoucherEntryNavigator from '../../screens/scanning/VoucherEntryNavigator';

const ScannerStack = createNativeStackNavigator<ScannerStackParamList>();

/**
 * Stack navigator for the scanner screens.
 */
export default function ScannerStackNavigator() {
  return (
    <ScanningContextProvider>
      <ScannerStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <ScannerStack.Screen
          name="VoucherEntryStartScreen"
          component={VoucherEntryStartScreen}
        />
        <ScannerStack.Screen
          name="InvoicesScreen"
          component={InvoiceStackNavigator}
        />
        <ScannerStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <ScannerStack.Screen
            name="VoucherEntryNavigator"
            component={VoucherEntryNavigator}
          />
          <ScannerStack.Screen
            name="ManualVoucherScreen"
            component={ManualVoucherScreen}
          />
          <ScannerStack.Screen
            name="VoucherBatchScreen"
            component={VoucherBatchScreen}
          />
          <ScannerStack.Screen
            name="ScanningScreen"
            component={ScanningScreen}
          />
          <ScannerStack.Screen
            name="ConfirmValueScreen"
            component={ConfirmValueScreen}
          />
          <ScannerStack.Screen
            name="ConfirmationScreen"
            component={ConfirmationScreen}
          />
          <ScannerStack.Screen name="ReviewScreen" component={ReviewScreen} />
        </ScannerStack.Group>
      </ScannerStack.Navigator>
    </ScanningContextProvider>
  );
}
