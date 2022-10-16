import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import Homepage from './screens/Homepage';
import Invoice from './screens/Invoice';
import Profile from './screens/Profile';
import Login from './screens/Login';
import NavigationBar from './components/Navbar';
=======
import Login from './screens/Login';
>>>>>>> c8851bc (app screen updated for testing)
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import VendorsListDemo from './VendorsListDemo';
//add this import statement
import { getAllTestDocs } from './src/database/queries';
import { H1Heading } from './assets/Fonts';

export default function App() {
  //call the function here
  getAllTestDocs();
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
