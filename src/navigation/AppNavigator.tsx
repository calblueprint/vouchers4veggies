import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  AuthContext,
  AuthContextType,
  getAuthContext,
  useAuthReducer,
} from '../screens/auth/AuthContext';
import { NavigationBar } from './BottomTabNavigator';
import AuthStackNavigator from './stacks/AuthStackNavigator';

export default function AppNavigator() {
  const [authState, dispatch] = useAuthReducer();

  /**
   * Try fetching the user's auth token from AsyncStorage to see if they're logged in.
   * If we find one, we'll log them in automatically.
   */
  useEffect(() => {
    // Fetch the token from async storage then navigate to the appropriate place
    const restoreAuthToken = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('uid');
        // TODO: Check if token is valid
      } catch (e) {
        // Restoring token failed. This means that the user is not logged in.
        // Note that this is not actually an error.
      }

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken ?? null });
    };

    restoreAuthToken();
  }, []);

  const authContext: AuthContextType = React.useMemo(
    () => getAuthContext(dispatch),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {authState.userToken == null ? (
          <AuthStackNavigator />
        ) : (
          <NavigationBar />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
