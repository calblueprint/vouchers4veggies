import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import ContactUsScreen from '../../screens/profile/ContactUsScreen';
import { ProfileStackParamList } from '../types';
import { ContactUsContainer } from '../../screens/profile/styles';

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
      <ProfileStack.Screen name="ContactUsScreen" component={ContactUsScreen} />
    </ProfileStack.Navigator>
  );
}
