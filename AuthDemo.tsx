import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { useAuthContext } from './src/screens/auth/AuthContext';
import { signIn, signUp } from './src/utils/authUtils';

/**
 * Simple demo component to test Firebase authentication.
 * TODO: @wangannie remove once we implement auth functionality in auth screens.
 */
export default function AuthDemo() {
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('password');

  const { dispatch } = useAuthContext();
  const handleSignIn = async () => signIn(dispatch, { email, password });
  const handleCreateAccount = async () => signUp(dispatch, { email, password });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput onChangeText={setEmail} value={email} />
      <TextInput onChangeText={setPassword} value={password} />
      <Button onPress={handleCreateAccount} title="Create Account" />
      <Button onPress={handleSignIn} title="Sign In" />
    </View>
  );
}
