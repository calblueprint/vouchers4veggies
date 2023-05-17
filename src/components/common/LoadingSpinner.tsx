import React from 'react';
import { ActivityIndicator } from 'react-native';
import Colors from '../../../assets/Colors';

const style = { flex: 1 };

export default function LoadingSpinner() {
  return (
    <ActivityIndicator style={style} size="large" color={Colors.magenta} />
  );
}
