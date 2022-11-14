import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionsScreen from '../../screens/Transactions/TransactionsScreen';

const TransactionStack = createNativeStackNavigator();

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
        name="Transactions"
        component={TransactionsScreen}
      />
    </TransactionStack.Navigator>
  );
}
