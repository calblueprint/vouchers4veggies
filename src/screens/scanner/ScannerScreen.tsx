import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScanningScreen from '../scanning/ScanningScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// TODO: Implement screen here
export default function ScannerScreen() {
  return (
    <View style={styles.container}>
      <ScanningScreen />
    </View>
  );
}
