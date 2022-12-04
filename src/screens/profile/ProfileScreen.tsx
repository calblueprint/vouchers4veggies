import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { shouldUseActivityState } from 'react-native-screens';
import {
  H2Heading,
  H3_Subheading,
  H4_Card_Nav_Tab,
  H1Heading,
  Body_1_Text,
} from '../../../assets/Fonts';
import { signOut } from '../../utils/authUtils';
import { useAuthContext } from '../auth/AuthContext';
import { ButtonMagenta } from '../scanning/styles';
import { ButtonTextWhite } from '../../../assets/Fonts';

export default function ProfileScreen() {
  const { dispatch } = useAuthContext();
  const [name, setName] = useState(0);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <H1Heading style={styles.center_text} name={name} setName={setName}>
        name
      </H1Heading>
      <View style={styles.body_text1}>
        <Body_1_Text>Email</Body_1_Text>
        <H3_Subheading email={email} setEmail={setEmail}>
          email
        </H3_Subheading>
      </View>
      <View style={styles.container}>
        <H4_Card_Nav_Tab>Phone Number</H4_Card_Nav_Tab>
        <H3_Subheading
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        >
          phoneNumber
        </H3_Subheading>
      </View>
      <View style={styles.container}>
        <H4_Card_Nav_Tab>Password</H4_Card_Nav_Tab>
        <H3_Subheading password={password} setPassword={setPassword}>
          password
        </H3_Subheading>
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
  horizontal_line: {
    height: '1px',
    borderColor: 'lightGray',
    border: 'solid',
  },
  body_text1: {
    position: 'absolute',
    width: 35,
    height: 19,
    left: 29,
    top: 277,
  },
});
