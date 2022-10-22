import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.row}>Edit Profile</Text>
      <View style={styles.row}>
        <Text>Name</Text>
      </View>
      <Text style={styles.row}>Uhhhh pfp data goes here :(</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
