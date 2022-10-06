import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';

export default function StartScreen(props) {
  console.log(props.navigation);
  console.log(props.navigation.push);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello! Let's get started.</Text>

      <View>
        <Button
          onPress={() => props.navigation.push('Login')}
          title="Login"
          color="#f2f2f2"
        />
      </View>

      <View>
        <Button
          onPress={() => props.navigation.push('Signup')}
          title="Signup"
          color="#d9d9d9"
        />
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
