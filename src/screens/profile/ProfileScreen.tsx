import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { shouldUseActivityState } from 'react-native-screens';
import { H2Heading, H3_Subheading } from '../../../assets/Fonts';
import { signOut } from '../../utils/authUtils';
import { useAuthContext } from '../auth/AuthContext';
import { ButtonMagenta } from '../scanning/styles';

export default function ProfileScreen() {
  const { dispatch } = useAuthContext();
  const [name, setName] = useState(0);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <H2Heading style={styles.center_text} name={name} setName={setName}>
        name
      </H2Heading>
      <hr
        style={{
          height: '1px',
          borderColor: 'lightGray',
          border: 'none',
        }}
      />

      <H3_Subheading>To be implemented...</H3_Subheading>
      <ButtonMagenta onPress={() => signOut(dispatch)} title="Log out" />
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
});
