import React, { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { NavigationBar } from './src/navigation/NavigationBar';
// import { H1Heading } from './assets/Fonts';
import { H1Heading } from './assets/Fonts';
import AuthDemo from './AuthDemo';
import { getAllTestDocs } from './src/database/queries';
// import VendorsListDemo from './VendorsListDemo';
// import { TransactionsScreen } from './src/screens/Transactions/TransactionsScreen';

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

// const Tab = createBottomTabNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

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

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  getAllTestDocs();
  return (
    <NavigationContainer>
      <NavigationBar />
    </NavigationContainer>
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
