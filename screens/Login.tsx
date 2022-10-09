import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import Form from 'react-native-form';
import { useState } from 'react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    // query firebase
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1_heading}>
        Welcome back!
        <br />
        Please login.
      </Text>

      <Form style={styles.form_container}>
        <View>
          <Text style={styles.h4_heading}>Email</Text>

          <View>
            <TextInput
              onChangeText={newText => setEmail(newText)}
              style={styles.form_field}
              value={email}
            />
          </View>
        </View>

        <View>
          <Text style={styles.h4_heading}>Password</Text>

          <View>
            <TextInput
              onChangeText={newText => setPassword(newText)}
              style={styles.form_field}
              value={password}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View>
          <Button onPress={submitForm} title="Login" color="#d9d9d9" />
        </View>
      </Form>

      <Text>Don't have an account? {<a href={'./Signup'}>Sign up.</a>} </Text>
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
  h1_heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '5%',
  },
  h4_heading: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  form_container: {
    width: '80%',
    height: '50%',
  },
  form_field: {
    width: '100%',
    borderColor: '#f2f2f2',
    backgroundColor: '#f2f2f2',
    padding: '5px',
    margin: '10px',
  },
});
