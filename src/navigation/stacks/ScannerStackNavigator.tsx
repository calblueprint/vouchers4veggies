import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScannerScreen from '../../screens/scanner/ScannerScreen';
import ManualVoucherScreen from '../../screens/scanning/ManualVoucherScreen';

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
      <ScannerStack.Screen
        name="ManualVoucher"
        component={ManualVoucherScreen}
      />
    </ScannerStack.Navigator>
  );
}
