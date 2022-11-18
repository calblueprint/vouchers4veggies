import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { H1Heading, H4_Card_Nav_Tab } from '../../../assets/Fonts';
import { ButtonWhite, ButtonMagenta } from '../../../assets/Components';
import {
  LoginContainer,
  DarkGrayText,
  LogoContainer,
  StartContainer,
  ButtonContainer,
  WhiteText,
} from './styles';

export const StartScreen = ({ route, navigation }: any) => {
  const toLoginScreen = () => {
    // implement routing
  };
  const toSignupScreen = () => {
    // implement routing
  };

  return (
    <View style={styles.container}>
      <LoginContainer>
        {/* logo placeholder */}
        <LogoContainer>
          <View style={{ backgroundColor: 'black', width: 50, height: 59.29 }}>
            <Text style={{ color: 'white' }}>{`\n  Logo`}</Text>
          </View>
        </LogoContainer>

        <StartContainer>
          <H1Heading>{"Hello! Let's\nget started."}</H1Heading>

          <ButtonContainer>
            <ButtonWhite onPress={toLoginScreen}>
              <DarkGrayText>
                <H4_Card_Nav_Tab>Login</H4_Card_Nav_Tab>
              </DarkGrayText>
            </ButtonWhite>
          </ButtonContainer>

          <ButtonContainer>
            <ButtonMagenta onPress={toSignupScreen}>
              <WhiteText>
                <H4_Card_Nav_Tab>Sign Up</H4_Card_Nav_Tab>
              </WhiteText>
            </ButtonMagenta>
          </ButtonContainer>
        </StartContainer>
      </LoginContainer>
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
  button: {
    width: 300,
    margin: 10,
  },
});
