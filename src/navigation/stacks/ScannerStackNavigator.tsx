import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ScannerScreen from '../../screens/scanning/ScanningScreen';
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
      <ScannerStack.Screen name="ScanningScreen" component={ScannerScreen} />
    </ScannerStack.Navigator>
  );
}
