import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonMagenta, ButtonWhite } from '../../../assets/Components';
import { H1Heading, H4_Card_Nav_Tab } from '../../../assets/Fonts';
import {
  ButtonContainer,
  DarkGrayText,
  LoginContainer,
  LogoContainer,
  StartContainer,
  WhiteText,
} from './styles';

export const StartScreen = ({ route, navigation }: any) => {
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
            <ButtonWhite onPress={() => navigation.navigate('Login')}>
              <DarkGrayText>
                <H4_Card_Nav_Tab>Login</H4_Card_Nav_Tab>
              </DarkGrayText>
            </ButtonWhite>
          </ButtonContainer>

          <ButtonContainer>
            {/* TODO: navigate to signup screen */}
            <ButtonMagenta>
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
