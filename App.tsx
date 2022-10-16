import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Login } from './screens/LoginScreen';
import { StartScreen } from './screens/StartScreen';

export default function App() {
  // return <StartScreen></StartScreen>;
  return <Login></Login>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
