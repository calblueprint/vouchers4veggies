import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

const scanVoucher = () => {

}

export default function Homepage () {
  return (
    
    <View style={styles.container}>
      <Text>Hello! Scan your vouchers</Text>
      <button onClick={scanVoucher}>Scan</button>
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