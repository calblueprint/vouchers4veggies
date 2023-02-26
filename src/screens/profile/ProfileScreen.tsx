import React, { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { shouldUseActivityState } from 'react-native-screens';
// import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { start } from 'repl';
import {
  H1Heading,
  Body1Text,
  H3Subheading,
  H4CardNavTab,
  H2Heading,
  ButtonTextWhite,
} from '../../../assets/Fonts';
// import { signOut } from '../../utils/authUtils';
import { useAuthContext } from '../auth/AuthContext';
import { HeadingContainer, ButtonContainer, ButtonBlank } from './styles';
import { ButtonMagenta, LogoContainer } from '../scanning/styles';
import { AuthStackScreenProps } from '../../navigation/types';
// import { DarkGrayText } from '../auth/styles';

export default function ProfileScreen({
  navigation,
}: AuthStackScreenProps<'Start'>) {
  const { dispatch } = useAuthContext();
  const [name, setName] = useState(0);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // create left and right container for every screen
  return (
    <>
      <View>
        {/* logo placeholder */}
        <LogoContainer>
          <View style={{ backgroundColor: 'black', width: 50, height: 59.29 }}>
            <Text style={{ color: 'white' }}>{`\n  Logo`}</Text>
          </View>
        </LogoContainer>
        {/* <View style={styles.body_text1}>
    <Body1Text>Email</Body1Text>
    <H3Subheading email={email} setEmail={setEmail}>
      email
    </H3Subheading>
  </View> */}
        {/* <View style={styles.container}>
    <Body1Text>Phone Number</Body1Text>
    <H3Subheading
      style={styles.name}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
    >
      (123) 456-7890
    </H3Subheading>
  </View> */}
        {/* <View style={styles.container}>
    <Body1Text>Password</Body1Text>
    <H3Subheading password={password} setPassword={setPassword}>
      password
    </H3Subheading>
  </View> */}
      </View>
      <HeadingContainer>
        <H2Heading> Hi, Derby Food Market!</H2Heading>
      </HeadingContainer>
      <ButtonContainer>
        <ButtonBlank title="Email" color="black" />
        <H4CardNavTab> email@email.com</H4CardNavTab>
      </ButtonContainer>
      <ButtonContainer>
        <ButtonBlank title="Phone Number" color="black" />
        <H4CardNavTab> (123) 456-7890</H4CardNavTab>
      </ButtonContainer>
      <ButtonContainer>
        <ButtonBlank title="Password" color="black" />
        <H4CardNavTab> ............</H4CardNavTab>
      </ButtonContainer>
      <ButtonMagenta>
        <ButtonTextWhite>Log Out</ButtonTextWhite>
      </ButtonMagenta>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   center_text: {
//     textAlign: 'center',
//   },
//   body_text1: {
//     textAlign: 'absolute',
//     width: 35,
//     height: 19,
//     left: 29,
//     top: 277,
//   },
//   name: {
//     width: 254,
//     height: 44,
//     left: 10,
//     top: 132,
//   },
//   phone: {
//     textAlign: 'center',
//     width: 132,
//     height: 25,
//     left: 29,
//     top: 376,
//   },
//   button: {
//     textAlign: 'center',
//     width: 277,
//     height: 43,
//     left: 49,
//     top: 615,f
//   },
//   HeaderContainer: {
//     width: 277px,
//     align-items: center,
//     margin-bottom: 35,
//   },
//   passwordButton: {},
//   phoneButton: {},
// });
