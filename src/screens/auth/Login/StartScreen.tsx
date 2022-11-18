import { Text, StyleSheet, View, Button } from 'react-native';
import React from 'react';
import { H1Heading, H4_Card_Nav_Tab } from '../../../../assets/Fonts';
import { ButtonWhite, ButtonMagenta } from '../../../../assets/Components';
import {
  ButtonContainer,
  Container,
  DarkGrayText,
  LogoContainer,
  StartContainer,
  WhiteText,
} from './styles';

export const StartScreen = () => {
  const toLoginScreen = () => {};
  const toSignupScreen = () => {};

  return (
    <Container>
      {/* logo placeholder */}
      <LogoContainer>
        <View style={{ backgroundColor: 'black', width: 50, height: 59.29 }}>
          <Text style={{ color: 'white' }}>{`\n  Logo`}</Text>
        </View>
      </LogoContainer>

      <StartContainer>
        <H1Heading>{"Hello! Let's\nget started."}</H1Heading>

        <ButtonContainer>
          <ButtonWhite>
            <DarkGrayText>
              <H4_Card_Nav_Tab onPress={toLoginScreen}>Login</H4_Card_Nav_Tab>
            </DarkGrayText>
          </ButtonWhite>
        </ButtonContainer>
        <ButtonContainer>
          <ButtonMagenta>
            <WhiteText>
              <H4_Card_Nav_Tab onPress={toSignupScreen}>
                Sign Up
              </H4_Card_Nav_Tab>
            </WhiteText>
          </ButtonMagenta>
        </ButtonContainer>
      </StartContainer>
    </Container>
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
