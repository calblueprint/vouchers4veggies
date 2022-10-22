import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

/**
 * Simple demo component to test Firebase authentication.
 */
export default function AuthDemo() {
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('password');

  const handleSignIn = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const { user } = userCredential;
        console.log(
          'Auth Success: signed in user with email',
          userCredential.user.email,
        );
        // TODO @wangannie: replace with AuthContext
        AsyncStorage.setItem('uid', user.uid);
      })
      .catch(error => {
        console.warn('(handleSignIn) error', error);
      });
  };

  const handleCreateAccount = async () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const { user } = userCredential;
        console.log(
          'Auth Success: created user with email',
          userCredential.user.email,
        );
        // TODO @wangannie: replace with AuthContext
        AsyncStorage.setItem('uid', user.uid);
      })
      .catch(error => {
        console.warn('(handleCreateAccount) error', error);
      });
  };

  return (
    <View>
      <TextInput onChangeText={setEmail} value={email} />
      <TextInput onChangeText={setPassword} value={password} />
      <Button onPress={handleCreateAccount} title="Create Account" />
      <Button onPress={handleSignIn} title="Sign In" />
    </View>
  );
}
