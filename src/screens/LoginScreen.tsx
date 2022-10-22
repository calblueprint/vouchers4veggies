import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import { H1Heading, H4_Card_Nav_Tab } from '../../assets/Fonts';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    // query firebase
  };

  const goToSignup = () => {
    // set up routing to sign up page
  };

  return (
    <View style={styles.container}>
      <H1Heading>{`Welcome back!\nPlease login.`}</H1Heading>

      <View style={styles.form_container}>
        <View>
          <H4_Card_Nav_Tab>Email</H4_Card_Nav_Tab>
          <TextInput
            onChangeText={newText => setEmail(newText)}
            style={styles.form_field}
            value={email}
          />
        </View>

        <View>
          <H4_Card_Nav_Tab>Password</H4_Card_Nav_Tab>
          <TextInput
            onChangeText={newText => setPassword(newText)}
            style={styles.form_field}
            value={password}
            secureTextEntry={true}
          />
        </View>

        <View>
          <Button onPress={submitForm} title="Login" />
        </View>
      </View>

      <Text>
        Don't have an account?{' '}
        <Text style={styles.underline} onPress={goToSignup}>
          Sign up.
        </Text>
      </Text>
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
  form_container: {
    width: '80%',
    height: '50%',
  },
  form_field: {
    width: '100%',
    borderColor: '#f2f2f2',
    backgroundColor: '#f2f2f2',
    padding: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
