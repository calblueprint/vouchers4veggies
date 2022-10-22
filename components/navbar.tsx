import * as React from 'react';
import {View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Homepage from '../screens/Homepage'
import Invoice from '../screens/Invoice'
import Profile from '../screens/Profile'

const home = "Home";

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={home}
                >
                <Tab.Screen name="Home" component={Homepage}></Tab.Screen>
                <Tab.Screen name="Invoices" component={Invoice}></Tab.Screen>
                <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

