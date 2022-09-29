import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './screens/Homepage'
import Invoice from './screens/Invoice'
import Profile from './screens/Profile'


export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Vouchers 4 Veggies</Text>
        <Homepage></Homepage>
      </View>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator(); 

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Homepage}
          options={{ title: "Welcome"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
