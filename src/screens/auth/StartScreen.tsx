import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonMagenta, ButtonWhite } from '../../../assets/Components';
import { H1Heading, H4CardNavTab } from '../../../assets/Fonts';
import { AuthStackScreenProps } from '../../navigation/types';
import {
  ButtonContainer,
  DarkGrayText,
  LoginContainer,
  LogoContainer,
  StartContainer,
  WhiteText,
} from './styles';

export default function StartScreen({
  navigation,
}: AuthStackScreenProps<'Start'>) {
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
                <H4CardNavTab>Login</H4CardNavTab>
              </DarkGrayText>
            </ButtonWhite>
          </ButtonContainer>

          <ButtonContainer>
            {/* TODO: navigate to signup screen */}
            <ButtonMagenta>
              <WhiteText>
                <H4CardNavTab>Sign Up</H4CardNavTab>
              </WhiteText>
            </ButtonMagenta>
          </ButtonContainer>
        </StartContainer>
      </LoginContainer>
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
  button: {
    width: 300,
    margin: 10,
  },
});
