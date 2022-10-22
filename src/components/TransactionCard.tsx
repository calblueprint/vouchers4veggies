import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import { H2Heading } from '../../assets/Fonts';

export const TransactionCard = (props: any) => {
  return (
    <View style={styles.row}>
      <View>
        <Text>{props.id}</Text>
        <Text>{props.date}</Text>
      </View>
      <Text>x{props.count}</Text>
      <Text>${props.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
