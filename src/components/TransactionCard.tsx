import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import { H2Heading } from '../../assets/Fonts';

export const TransactionCard = (props: any) => {
  return (
    <View>
      <View>
        <Text>{props.id}</Text>
        <Text>{props.date}</Text>
      </View>
      <Text>x{props.amount}</Text>
      <Text>${props.price}</Text>
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
});
