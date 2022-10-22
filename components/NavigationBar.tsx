import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors } from '../assets/Colors';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Homepage } from '../screens/Homepage';
import { Invoice } from '../screens/Invoice';
import { Profile } from '../screens/Profile';

const home = 'Home';

const Tab = createMaterialBottomTabNavigator();

export const NavigationBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={home}
      barStyle={{ backgroundColor: Colors.brandMagenta }}
    >
      <Tab.Screen
        name="Home"
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
            <Ionicons name="md-person-outline" color={color} size={26} />
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
