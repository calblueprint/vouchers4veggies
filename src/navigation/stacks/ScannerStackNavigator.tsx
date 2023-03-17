import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ConfirmValueScreen from '../../screens/scanning/ConfirmValueScreen';
import ManualVoucherScreen from '../../screens/scanning/ManualVoucherScreen';
import ScanningScreen from '../../screens/scanning/ScanningScreen';
import { ScannerStackParamList } from '../types';

const ScannerStack = createNativeStackNavigator<ScannerStackParamList>();

/**
 * Stack navigator for the scanner screens.
 */
export default function ScannerStackNavigator() {
  return (
    <ScannerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ScannerStack.Screen name="ScanningScreen" component={ScanningScreen} />
      <ScannerStack.Screen
        name="ManualVoucherScreen"
        component={ManualVoucherScreen}
      />
      <ScannerStack.Screen
        name="ConfirmValueScreen"
        component={ConfirmValueScreen}
      />
    </ScannerStack.Navigator>
  );
}
