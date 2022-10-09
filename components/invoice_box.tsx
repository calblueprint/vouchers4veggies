import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const InvoiceBox = () => {
  return (
    <div
      style={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        padding: '10px',
        margin: '20px',
      }}
    ></div>
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
