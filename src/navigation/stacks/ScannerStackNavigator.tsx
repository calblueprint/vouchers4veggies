import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ScannerScreen from '../../screens/scanner/ScannerScreen';
import ManualVoucherScreen from '../../screens/scanning/ManualVoucherScreen';
import { ScannerStackParamList } from '../types';
import ReviewScreen from '../../screens/scanning/ReviewScreen';
// import ScannerScreen from '../../screens/scanner/ScannerScreen';
import ScanningScreen from '../../screens/scanning/ScanningScreen';

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
      <ScannerStack.Screen name="Scanner" component={ScanningScreen} />
      <ScannerStack.Screen name="Review" component={ReviewScreen} />
      <ScannerStack.Screen
        name="ManualVoucher"
        component={ManualVoucherScreen}
      />
    </ScannerStack.Navigator>
  );
}
