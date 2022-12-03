import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import { ProfileStackParamList } from '../types';

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

/**
 * Stack navigator for the profile screens.
 */
export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}
