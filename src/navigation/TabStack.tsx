import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//update imports with proper screens
import { Homepage } from '../screens/Homepage';
import { Invoice } from '../screens/Invoice';
import { Profile } from '../screens/Profile';

const home = 'Home';

const Tab = createMaterialBottomTabNavigator();

export const NavigationBar = () => {
  return (
    <Tab.Navigator initialRouteName={home}>
      <Tab.Screen name="Home" component={Homepage}></Tab.Screen>
      <Tab.Screen name="Invoices" component={Invoice}></Tab.Screen>
      <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
    </Tab.Navigator>
  );
};
