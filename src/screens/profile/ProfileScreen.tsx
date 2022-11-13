import React from 'react';
import { StyleSheet, View } from 'react-native';
import { H2Heading, H3_Subheading } from '../../../assets/Fonts';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <H2Heading>Profile Screen</H2Heading>
      <H3_Subheading>To be implemented...</H3_Subheading>
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
