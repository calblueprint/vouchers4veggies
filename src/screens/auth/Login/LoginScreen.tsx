import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import {
  H1Heading,
  H2Heading,
  H4_Card_Nav_Tab,
} from '../../../../assets/Fonts';
import { InputField } from '../../../components/InputField/InputField';
import { Colors } from '../../../../assets/Colors';
import {
  LeftAlignedContainer,
  LoginContainer,
  FormContainer,
  Styles,
} from './styles';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    // query firebase
  };

  const goToSignup = () => {
    // set up routing to sign up page
  };

  return (
    <LoginContainer>
      {/* logo placeholder */}
      <LeftAlignedContainer>
        <View style={{ backgroundColor: 'black', width: 50, height: 59.29 }}>
          <Text style={{ color: 'white' }}>{`\n  Logo`}</Text>
        </View>
      </LeftAlignedContainer>

      <FormContainer>
        <LeftAlignedContainer>
          <H2Heading>Welcome back!</H2Heading>
        </LeftAlignedContainer>

        <H4_Card_Nav_Tab>Email</H4_Card_Nav_Tab>
        <InputField onChange={setEmail} value={email} />

        <H4_Card_Nav_Tab>Password</H4_Card_Nav_Tab>
        <InputField
          onChange={setPassword}
          value={password}
          secureTextEntry={true}
        />

        <Button onPress={submitForm} title="Login" />
      </FormContainer>
      <LeftAlignedContainer>
        <Text>
          Don't have an account?{' '}
          <Text style={Styles.underline} onPress={goToSignup}>
            Sign up.
          </Text>
        </Text>
      </LeftAlignedContainer>
    </LoginContainer>
  );
};
