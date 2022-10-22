<<<<<<< HEAD
import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

export const StartScreen = () => {
  const toLoginScreen = () => {};
  const toSignupScreen = () => {};
=======
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { useState } from 'react';

export default function StartScreen(props) {
  const toLoginScreen = () => {
    props.navigation.navigate('Login');
  };
  const toSignupScreen = () => {
    props.navigation.navigate('Signup');
  };
>>>>>>> 85d009a (setting up navigation)

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello! Let's get started.</Text>

<<<<<<< HEAD
      <View style={styles.button}>
        <Button onPress={toLoginScreen} title="Login" color="#f2f2f2" />
      </View>

      <View style={styles.button}>
=======
      <View>
        <Button onPress={toLoginScreen} title="Login" color="#f2f2f2" />
      </View>

      <View>
>>>>>>> 85d009a (setting up navigation)
        <Button onPress={toSignupScreen} title="Signup" color="#d9d9d9" />
      </View>
    </View>
  );
<<<<<<< HEAD
};
=======
}
>>>>>>> 85d009a (setting up navigation)

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
<<<<<<< HEAD
    margin: '10%',
  },
  button: {
    width: '80%',
    margin: '10px',
=======
>>>>>>> 85d009a (setting up navigation)
  },
});
