import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { useState } from 'react';

export default function StartScreen(props) {
  const toLoginScreen = () => {
    props.navigation.navigate('Login');
  };
  const toSignupScreen = () => {
    props.navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello! Let's get started.</Text>

      <View>
        <Button onPress={toLoginScreen} title="Login" color="#f2f2f2" />
      </View>

      <View>
        <Button onPress={toSignupScreen} title="Signup" color="#d9d9d9" />
      </View>
    </View>
  );
}

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
  },
});
