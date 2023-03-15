import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TransactionDetailsScreen from '../../screens/Transactions/TransactionDetailsScreen';
import TransactionsScreen from '../../screens/Transactions/TransactionsScreen';
import { TransactionStackParamList } from '../types';

const TransactionStack =
  createNativeStackNavigator<TransactionStackParamList>();

/**
 * Stack navigator for the transaction/invoice screens.
 */
export default function TransactionStackNavigator() {
  return (
    <TransactionStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TransactionStack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}
      />

      <TransactionStack.Screen
        name="TransactionDetailsScreen"
        component={TransactionDetailsScreen}
      />
    </TransactionStack.Navigator>
  );
}
