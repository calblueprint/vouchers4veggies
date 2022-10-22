import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { TransactionCard } from '../components/TransactionCard';

export const TransactionsScreen = () => {
  return (
    <View style={styles.container}>
      <TransactionCard id="123123" date="10/22/22" count="4" price="10.43" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
