import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuthContext } from '../screens/auth/AuthContext';

import NavigationBar from './BottomTabNavigator';
import AuthStackNavigator from './stacks/AuthStackNavigator';

export default function AppNavigator() {
  const { user, isLoading } = useAuthContext();

  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingSpinner />
      ) : user ? (
        <NavigationBar />
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
}
