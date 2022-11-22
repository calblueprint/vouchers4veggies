import * as React from 'react';

import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Colors from '../../assets/Colors';
import ProfileStackNavigator from './stacks/ProfileStackNavigator';
import ScannerStackNavigator from './stacks/ScannerStackNavigator';
import TransactionStackNavigator from './stacks/TransactionStackNavigator';
import { BottomTabParamList } from './types';

const initialRouteName = 'Home';

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

export function NavigationBar() {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      barStyle={{ backgroundColor: Colors.magenta }}
    >
      <Tab.Screen
        name="Home"
        component={ScannerStackNavigator}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color }) => (
            <AntDesign name="scan1" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-person-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionStackNavigator}
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="compare-arrows" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
