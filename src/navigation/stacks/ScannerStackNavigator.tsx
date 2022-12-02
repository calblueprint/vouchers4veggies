import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ScannerScreen from '../../screens/scanner/ScannerScreen';
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
      <ScannerStack.Screen name="Review" component={ReviewScreen} />
      <ScannerStack.Screen name="Scanner" component={ScannerScreen} />
    </ScannerStack.Navigator>
  );
}
