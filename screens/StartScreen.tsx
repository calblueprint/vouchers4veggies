import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Login } from './Login';

export const StartScreen = () => {
  const toLoginScreen = () => {};
  const toSignupScreen = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello! Let's get started.</Text>

      <View style={styles.button}>
        <Button onPress={toLoginScreen} title="Login" color="#f2f2f2" />
      </View>

      <View style={styles.button}>
        <Button onPress={toSignupScreen} title="Signup" color="#d9d9d9" />
      </View>
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
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '10%',
  },
  button: {
    width: '80%',
    margin: '10px',
  },
});
