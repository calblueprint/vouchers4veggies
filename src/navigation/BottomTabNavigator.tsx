import * as React from 'react';

import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors } from '../../assets/Colors';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ScannerScreen from '../screens/scanner/ScannerScreen';
import TransactionsScreen from '../screens/Transactions/TransactionsScreen';

const initialRouteName = 'Home';

const Tab = createMaterialBottomTabNavigator();

export const NavigationBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      barStyle={{ backgroundColor: Colors.magenta }}
    >
      <Tab.Screen
        name="Home"
        component={ScannerScreen}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color }) => (
            <AntDesign name="scan1" color={color} size={26} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-person-outline" color={color} size={26} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
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
