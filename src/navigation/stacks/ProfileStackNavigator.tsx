import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EditEmailScreen from '../../screens/profile/EditEmailScreen';
import EditPhoneNumber from '../../screens/profile/EditPhoneNumber';
import EmailEnteredScreen from '../../screens/profile/EmailEnteredScreen';
import PhoneNumberEntered from '../../screens/profile/PhoneNumberEntered';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import TypingEmailScreen from '../../screens/profile/TypingEmailScreen';
import TypingPhoneNumber from '../../screens/profile/TypingPhoneNumber';
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
      <ProfileStack.Screen name="EditEmailScreen" component={EditEmailScreen} />
      <ProfileStack.Screen name="TypingEmail" component={TypingEmailScreen} />
      <ProfileStack.Screen name="EmailEntered" component={EmailEnteredScreen} />
      <ProfileStack.Screen name="EditPhoneNumber" component={EditPhoneNumber} />
      <ProfileStack.Screen name="TypeNumber" component={TypingPhoneNumber} />
      <ProfileStack.Screen
        name="NumberEntered"
        component={PhoneNumberEntered}
      />
    </ProfileStack.Navigator>
  );
}
