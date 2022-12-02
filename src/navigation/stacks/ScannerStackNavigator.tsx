import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScannerScreen from '../../screens/scanner/ScannerScreen';
import ReviewScreen from '../../screens/scanning/ReviewScreen';

const ScannerStack = createNativeStackNavigator();

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
      <ScannerStack.Screen name="Scanner" component={ScannerScreen} />
      <ScannerStack.Screen name="Review" component={ReviewScreen} />
    </ScannerStack.Navigator>
  );
}
