import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import {
  H1Heading,
  H3_Subheading,
  H4_Card_Nav_Tab,
} from '../../../assets/Fonts';
import { Colors } from '../../../assets/Colors';
import { sendPasswordResetEmail } from 'firebase/auth';

export const ProfileScreen = () => {
  const [name, setName] = useState(0);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <H1Heading style={styles.center_text} name={name} setName={setName}>
        name
      </H1Heading>
      <View style={styles.container}>
        <H4_Card_Nav_Tab>Email</H4_Card_Nav_Tab>
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
});
