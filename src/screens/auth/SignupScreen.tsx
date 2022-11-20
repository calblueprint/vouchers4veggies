import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import { H1Heading, H4_Card_Nav_Tab } from '../../../assets/Fonts';
import { Colors } from '../../../assets/Colors';

export const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [verifyPassword, setVerifyPassword] = useState('');

  // const [submitted, setSubmitted] = useState(false);
  // const [error, setError] = useState(false);

  const submitForm = () => {
    //write data to firebase
    console.log(name);
    console.log(email);
  };

  const goToLogin = () => {
    //routing to login in screen
  };

  //   const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
  //     setEmail(e.target.value);
  //     setSubmitted(false);
  //   };

  //   const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
  //     setPassword(e.target.value);
  //     setSubmitted(false);
  //   };

  //   const handleVerifyPassword = (e: ChangeEvent<HTMLInputElement>) => {
  //     setVerifyPassword(e.target.value);
  //     setSubmitted(false);
  //   };

  //   const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     if (email === '' || password === '' || verifyPassword === '') {
  //       setError(true);
  //     } else if (verifyPassword !== password) {
  //       setError(true);
  //     } else {
  //       setSubmitted(true);
  //     }
  //   };

  return (
    <View style={styles.container}>
      <H1Heading
        style={styles.left_text}
      >{`Hi there! Please\ncreate an account.`}</H1Heading>

      <View style={styles.form_container}>
        <H4_Card_Nav_Tab>Name</H4_Card_Nav_Tab>
        <TextInput
          //{
          //figure out how to change border color to magenta upon onFocus
          //}
          onChangeText={newText => setName(newText)}
          placeholder="Enter name"
          placeholderTextColor={Colors.midGray}
          style={styles.form_field}
          value={name}
        />

        <H4_Card_Nav_Tab>Email</H4_Card_Nav_Tab>
        <TextInput
          onChangeText={newText => setEmail(newText)}
          placeholder="Enter email"
          placeholderTextColor={Colors.midGray}
          style={styles.form_field}
          value={email}
        />

        <TouchableOpacity style={styles.button} onPress={submitForm}>
          <Text style={styles.white}>Next</Text>
        </TouchableOpacity>
      </View>

      <Text>
        Already have an account?{' '}
        <Text style={styles.underline} onPress={goToLogin}>
          Login.
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
  center_text: {
    textAlign: 'center',
  },
  left_text: {
    textAlign: 'left',
  },
  form_container: {
    width: 300,
    height: '50%',
  },
  form_field: {
    width: '100%',
    backgroundColor: Colors.lightGray,
    borderColor: Colors.darkGray,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.magenta,
    padding: 10,
    borderRadius: 5,
  },
  white: {
    color: Colors.offWhite,
  },
});
