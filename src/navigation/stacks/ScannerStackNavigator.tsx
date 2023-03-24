import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ConfirmationScreen from '../../screens/scanning/ConfirmationScreen';
import ConfirmValueScreen from '../../screens/scanning/ConfirmValueScreen';
import ManualVoucherScreen from '../../screens/scanning/ManualVoucherScreen';
import ReviewScreen from '../../screens/scanning/ReviewScreen';
import { ScanningContextProvider } from '../../screens/scanning/ScanningContext';
import ScanningScreen from '../../screens/scanning/ScanningScreen';
import { ScannerStackParamList } from '../types';
import TransactionStackNavigator from './TransactionStackNavigator';

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
          name="ManualVoucherScreen"
          component={ManualVoucherScreen}
        />
        <ScannerStack.Screen name="ScanningScreen" component={ScanningScreen} />
        <ScannerStack.Screen
          name="ConfirmValueScreen"
          component={ConfirmValueScreen}
        />
        <ScannerStack.Screen name="ReviewScreen" component={ReviewScreen} />
        <ScannerStack.Screen
          name="ConfirmationScreen"
          component={ConfirmationScreen}
        />
        <ScannerStack.Screen
          name="Transactions"
          component={TransactionStackNavigator}
        />
      </ScannerStack.Navigator>
    </ScanningContextProvider>
  );
}
