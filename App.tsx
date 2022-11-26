import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import ReviewScreen from './src/screens/scanning/ReviewScreen';

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
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

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
        setResourcesLoaded(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (resourcesLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setResourcesLoaded`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [resourcesLoaded]);

  return !resourcesLoaded ? null : (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
