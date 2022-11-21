import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuthContext } from '../screens/auth/AuthContext';

import { NavigationBar } from './BottomTabNavigator';
import AuthStackNavigator from './stacks/AuthStackNavigator';

export default function AppNavigator() {
  const { user } = useAuthContext();

  return (
    <NavigationContainer>
      {user ? <NavigationBar /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
