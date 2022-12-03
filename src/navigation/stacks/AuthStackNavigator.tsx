import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../../screens/auth/LoginScreen';
import StartScreen from '../../screens/auth/StartScreen';
import { SignupScreen } from '../../screens/auth/SignupScreen';
import { CreatePassword } from '../../screens/auth/CreatePassword';

import { AuthStackParamList } from '../types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

/**
 * Stack navigator for the authentication screens.
 */
export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Start" component={StartScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Sign Up" component={SignupScreen} />
      <AuthStack.Screen name="Create Password" component={CreatePassword} />
    </AuthStack.Navigator>
  );
}
