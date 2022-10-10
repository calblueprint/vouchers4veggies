import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi there. Please create an account!</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Verify Password</Text>
        <TextInput
          style={styles.input}
          value={verifyPassword}
          onChangeText={text => setVerifyPassword(text)}
        />
      </View>
      <Text style={styles.text}>Password must include</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Sign up</Text>
      </TouchableOpacity>
      <Text>Already have an account? Log in.</Text>
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
  input: {
    flex: 1,
    height: 60,
    width: 250,
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  label: {
    flex: 1,
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 16,
  },
  text: {
    textAlign: 'left',
  },
  rowContainer: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    width: 250,
    padding: 10,
    margin: 40,
  },
});
