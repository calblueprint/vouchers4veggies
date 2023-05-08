import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import InvoiceDetailsScreen from '../../screens/transactions/InvoiceDetailsScreen';
import InvoicesScreen from '../../screens/transactions/InvoicesScreen';
import { InvoiceStackParamList } from '../types';

const InvoiceStack = createNativeStackNavigator<InvoiceStackParamList>();

/**
 * Stack navigator for the transaction/invoice screens.
 */
export default function InvoiceStackNavigator() {
  return (
    <InvoiceStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <InvoiceStack.Screen name="InvoicesScreen" component={InvoicesScreen} />

      <InvoiceStack.Screen
        name="InvoiceDetailsScreen"
        component={InvoiceDetailsScreen}
      />
    </InvoiceStack.Navigator>
  );
}
