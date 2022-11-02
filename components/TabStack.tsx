import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
//update imports with proper screens
import { Homepage } from '../src/screens/Homepage';
import { Invoice } from '../src/screens/Invoice';
import { Profile } from '../src/screens/Profile';
import { Colors } from '../assets/Colors';

const home = 'Home';

const Tab = createMaterialBottomTabNavigator();

export const NavigationBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={home}
      barStyle={{ backgroundColor: Colors.magenta, height: '95px' }}
    >
      <Tab.Screen
        name="Scan"
        component={Homepage}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color }) => (
            <AntDesign name="scan1" color={color} size={26} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={26}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Transactions"
        component={Invoice}
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="compare-arrows" color={color} size={26} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};
