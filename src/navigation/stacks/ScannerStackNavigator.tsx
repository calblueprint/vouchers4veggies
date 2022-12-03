import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScannerStackParamList } from '../types';
import ReviewScreen from '../../screens/scanning/ReviewScreen';
// import ScannerScreen from '../../screens/scanner/ScannerScreen';
import ScanningScreen from '../../screens/scanning/ScanningScreen';
import ManualVoucherScreen from '../../screens/scanning/ManualVoucherScreen';

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
      <ScannerStack.Screen name="ReviewScreen" component={ReviewScreen} />
    </ScannerStack.Navigator>
  );
}
