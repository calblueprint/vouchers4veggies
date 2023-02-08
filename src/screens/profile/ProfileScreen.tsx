import React, { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { shouldUseActivityState } from 'react-native-screens';
import {
  H1Heading,
  Body1Text,
  H3Subheading,
  H4CardNavTab,
  H2Heading,
} from '../../../assets/Fonts';
import { signOut } from '../../utils/authUtils';
import { useAuthContext } from '../auth/AuthContext';
import {
  ButtonContainer,
  DarkGrayText,
  LoginContainer,
  LogoContainer,
  StartContainer,
  WhiteText,
} from './styles';
import { ButtonTextWhite } from '../../../assets/Fonts';

export default function ProfileScreen() {
  const { dispatch } = useAuthContext();
  const [name, setName] = useState(0);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* logo placeholder */}
      <LogoContainer>
        <View style={{ backgroundColor: 'black', width: 50, height: 59.29 }}>
          <Text style={{ color: 'white' }}>{`\n  Logo`}</Text>
        </View>
      </LogoContainer>
      <H1Heading style={styles.name} name={name} setName={setName}>
        Noah Hernandez
      </H1Heading>
      <View style={styles.body_text1}>
        <Body1Text>Email</Body1Text>
        <H3Subheading email={email} setEmail={setEmail}>
          email
        </H3Subheading>
      </View>
      <View style={styles.container}>
        <Body1Text>Phone Number</Body1Text>
        <H3Subheading
          style={styles.name}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        >
          (123) 456-7890
        </H3Subheading>
      </View>
      <View style={styles.container}>
        <Body1Text>Password</Body1Text>
        <H3Subheading password={password} setPassword={setPassword}>
          password
        </H3Subheading>
      </View>
      <ButtonMagenta>
        <ButtonTextWhite>Log Out</ButtonTextWhite>
      </ButtonMagenta>
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
  center_text: {
    textAlign: 'center',
  },
  body_text1: {
    textAlign: 'center',
    width: 35,
    height: 19,
    left: 29,
    top: 277,
  },
  name: {
    textAlign: 'center',
    width: 254,
    height: 44,
    left: 60,
    top: 186,
  },
  phone: {
    textAlign: 'center',
    width: 132,
    height: 25,
    left: 29,
    top: 376,
  },
  button: {
    textAlign: 'center',
    width: 277,
    height: 43,
    left: 49,
    top: 615,
  },
});
