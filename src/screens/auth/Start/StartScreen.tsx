import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import { H1Heading } from '../../../../assets/Fonts';

export const StartScreen = () => {
  const toLoginScreen = () => {};
  const toSignupScreen = () => {};

  return (
    <View style={styles.container}>
      <H1Heading>Hello! Let's get started.</H1Heading>

      <View style={styles.button}>
        <Button onPress={toLoginScreen} title="Login" />
      </View>

      <View style={styles.button}>
        <Button onPress={toSignupScreen} title="Signup" />
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
  button: {
    width: 300,
    margin: 10,
  },
});
