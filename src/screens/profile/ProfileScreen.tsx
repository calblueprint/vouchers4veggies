import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { H2Heading, H3_Subheading } from '../../../assets/Fonts';
import { signOut } from '../../utils/authUtils';
import { useAuthContext } from '../auth/AuthContext';

export default function ProfileScreen() {
  const { dispatch } = useAuthContext();

  return (
    <View style={styles.container}>
      <H2Heading>Profile Screen</H2Heading>
      <H3_Subheading>To be implemented...</H3_Subheading>
      <Button onPress={() => signOut(dispatch)} title="Sign out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
