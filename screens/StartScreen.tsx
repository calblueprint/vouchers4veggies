<<<<<<< HEAD
import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

export const StartScreen = () => {
  const toLoginScreen = () => {};
  const toSignupScreen = () => {};
=======
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';

<<<<<<< HEAD
export default function StartScreen(props) {
  const toLoginScreen = () => {
    props.navigation.navigate('Login');
  };
  const toSignupScreen = () => {
    props.navigation.navigate('Signup');
  };
>>>>>>> 85d009a (setting up navigation)
=======
export default function StartScreen({ navigation }) {
  console.log(navigation);
>>>>>>> 2f4bd8f (nonfunctional routing)

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
        <Button
          onPress={() => navigation.navigate('Login')}
          title="Login"
          color="#f2f2f2"
        />
      </View>

      <View>
<<<<<<< HEAD
>>>>>>> 85d009a (setting up navigation)
        <Button onPress={toSignupScreen} title="Signup" color="#d9d9d9" />
=======
        <Button
          onPress={() => navigation.navigate('Signup')}
          title="Signup"
          color="#d9d9d9"
        />
>>>>>>> 2f4bd8f (nonfunctional routing)
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
