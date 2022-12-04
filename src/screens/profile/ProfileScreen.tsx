import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { shouldUseActivityState } from 'react-native-screens';
import {
  H2Heading,
  H3_Subheading,
  H4_Card_Nav_Tab,
  H1Heading,
  Body_1_Text,
  H3Subheading,
} from '../../../assets/Fonts';
import { H2Heading, H3Subheading } from '../../../assets/Fonts';
import { signOut } from '../../utils/authUtils';
import { useAuthContext } from '../auth/AuthContext';
import { ButtonMagenta } from '../scanning/styles';
import { ButtonTextWhite } from '../../../assets/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ProfileScreen() {
  const { dispatch } = useAuthContext();
  const [name, setName] = useState(0);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <H2Heading>Profile Screen</H2Heading>
      <H3Subheading>To be implemented...</H3Subheading>
      <Button onPress={() => signOut(dispatch)} title="Sign out" />
    </View>
  );
}
