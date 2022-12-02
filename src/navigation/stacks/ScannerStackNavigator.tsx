import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ManualVoucherScreen from '../../screens/scanning/ManualVoucherScreen';
import ScanningScreen from '../../screens/scanning/ScanningScreen';
import { ScannerStackParamList } from '../types';
import ReviewScreen from '../../screens/scanning/ReviewScreen';

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
