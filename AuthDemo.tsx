import React, { useContext, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { AuthContext } from './src/screens/auth/AuthContext';

/**
 * Simple demo component to test Firebase authentication.
 */
export default function AuthDemo() {
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('password');

  const { signIn, signUp, signOut } = useContext(AuthContext);
  const handleSignIn = async () => signIn(email, password);
  const handleCreateAccount = async () => signUp(email, password);

  return (
    <View>
      <TextInput onChangeText={setEmail} value={email} />
      <TextInput onChangeText={setPassword} value={password} />
      <Button onPress={handleCreateAccount} title="Create Account" />
      <Button onPress={handleSignIn} title="Sign In" />
      <Button onPress={signOut} title="Sign Out" />
    </View>
  );
}
