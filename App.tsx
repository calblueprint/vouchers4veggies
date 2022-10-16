import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './screens/Homepage'
import Invoice from './screens/Invoice'
import Profile from './screens/Profile'

import VendorsListDemo from './VendorsListDemo';
//add this import statement
import { getAllTestDocs } from './src/database/queries';
import { H1Heading } from './assets/Fonts';

export default function App() {
  //call the function here
  getAllTestDocs();
  return (
    <View style={styles.container}>
      <Homepage></Homepage>
      <Invoice></Invoice>
      <Profile></Profile>
    </View>
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
