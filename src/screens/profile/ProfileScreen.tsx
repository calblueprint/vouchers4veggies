import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { H2Heading, H3Subheading } from '../../../assets/Fonts';
import { signOut } from '../../utils/authUtils';
import { useAuthContext } from '../auth/AuthContext';

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

  return (
    <View style={styles.container}>
      <H2Heading>Profile Screen</H2Heading>
      <H3Subheading>To be implemented...</H3Subheading>
      <Button onPress={() => signOut(dispatch)} title="Sign out" />
    </View>
  );
}
