import * as React from 'react';

import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Colors from '../../assets/Colors';
import ProfileStackNavigator from './stacks/ProfileStackNavigator';
import ScannerStackNavigator from './stacks/ScannerStackNavigator';
import InvoiceStackNavigator from './stacks/InvoiceStackNavigator';
import { BottomTabParamList } from './types';

const initialRouteName = 'Home';

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

function ScanIcon({ color }: { color: string }) {
  return <AntDesign name="scan1" color={color} size={26} />;
}

function ProfileIcon({ color }: { color: string }) {
  return <Ionicons name="md-person-outline" color={color} size={26} />;
}

function InvoiceIcon({ color }: { color: string }) {
  return <MaterialIcons name="compare-arrows" color={color} size={26} />;
}

export default function NavigationBar() {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      barStyle={{ backgroundColor: Colors.magenta }}
    >
      <Tab.Screen
        name="Home"
        component={ScannerStackNavigator}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ScanIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileIcon,
        }}
      />
      <Tab.Screen
        name="Invoices"
        component={InvoiceStackNavigator}
        options={{
          tabBarLabel: 'Invoices',
          tabBarIcon: InvoiceIcon,
        }}
      />
    </Tab.Navigator>
  );
}
