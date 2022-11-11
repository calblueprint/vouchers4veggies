import { getAuth } from '@firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { H1Heading, H3_Subheading } from './assets/Fonts';
import AuthDemo from './AuthDemo';
import {
  AuthContext,
  AuthContextAction,
  AuthContextType,
  AuthState,
} from './src/screens/AuthContext';
import VendorsListDemo from './VendorsListDemo';
// import TransactionsScreen from './src/screens/Transactions/TransactionsScreen';
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

async function loadResourcesAsync() {
  await Promise.all([
    // Pre-load other resources (i.e. images) here
    Font.loadAsync({
      'manrope-bold': require('./assets/Manrope/static/Manrope-Bold.ttf'),
      'manrope-extraBold': require('./assets/Manrope/static/Manrope-ExtraBold.ttf'),
      'manrope-extraLight': require('./assets/Manrope/static/Manrope-ExtraLight.ttf'),
      'manrope-light': require('./assets/Manrope/static/Manrope-Light.ttf'),
      'manrope-medium': require('./assets/Manrope/static/Manrope-Medium.ttf'),
      'manrope-regular': require('./assets/Manrope/static/Manrope-Regular.ttf'),
      'manrope-semiBold': require('./assets/Manrope/static/Manrope-SemiBold.ttf'),
    }),
  ]);
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  /**
   * Load any resources or data that we need prior to rendering the app
   */
  useEffect(() => {
    async function prepare() {
      try {
        await loadResourcesAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

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
      } catch (e) {
        // Restoring token failed
      }

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken ?? null });
    };

    restoreAuthToken();
  }, []);

  const [authState, dispatch] = useReducer(
    (prevState: AuthState, action: AuthContextAction) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && !authState.isLoading) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, authState.isLoading]);

  const authContext: AuthContextType = React.useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then(async userCredential => {
            const { user } = userCredential;

            console.log(
              'Auth Success: signed in user with email',
              userCredential.user.email,
            );
            // After getting the user credential, persist the uid in AsyncStorage
            await AsyncStorage.setItem('uid', user.uid);
            dispatch({ type: 'SIGN_IN', token: user.uid });
          })
          .catch(error => {
            console.warn('(signIn) error', error);
          });
      },
      signOut: async () => {
        // Remove the uid from AsyncStorage
        await AsyncStorage.removeItem('uid');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then(async userCredential => {
            const { user } = userCredential;
            console.log(
              'Auth Success: created user with email',
              userCredential.user.email,
            );
            await AsyncStorage.setItem('uid', user.uid);
            dispatch({ type: 'SIGN_IN', token: user.uid });
          })
          .catch(error => {
            console.warn('(signUp) error', error);
          });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <H1Heading>Vouchers 4 Veggies</H1Heading>
          {authState.userToken == null ? (
            <H3_Subheading>No user token</H3_Subheading>
          ) : (
            <>
              <H3_Subheading>user token is {authState.userToken}</H3_Subheading>
              <VendorsListDemo />
            </>
          )}
          <AuthDemo />
        </View>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
