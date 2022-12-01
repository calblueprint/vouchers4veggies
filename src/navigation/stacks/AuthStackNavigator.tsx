import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../screens/auth/LoginScreen';
import { StartScreen } from '../../screens/auth/StartScreen';

const AuthStack = createNativeStackNavigator();

/**
 * Stack navigator for the authentication screens.
 */
export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Start" component={StartScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}
