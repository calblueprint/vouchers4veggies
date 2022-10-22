import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const InvoiceBox = () => {
  return (
    <View
      style={{
        backgroundColor: '#000000',
        padding: 10,
        margin: 20,
      }}
    ></View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InvoiceBox;
