import React from 'react';
import {
  ButtonMagenta,
  SafeArea,
  StartContainer,
} from '../../../assets/Components';
import { H1Heading, H4CardNavTab, WhiteText } from '../../../assets/Fonts';
import { AuthStackScreenProps } from '../../navigation/types';
import { StartButtonContainer } from './styles';
import StartLogo from '../../components/auth/StartLogo';

export default function StartScreen({
  navigation,
}: AuthStackScreenProps<'Start'>) {
  const onNavigateToLogin = () => navigation.navigate('Login');

  return (
    <SafeArea>
      <StartContainer>
        <StartLogo />
        <H1Heading>{"Hello! Let's get\nyou started."}</H1Heading>

        <StartButtonContainer>
          <ButtonMagenta onPress={onNavigateToLogin}>
            <WhiteText>
              <H4CardNavTab>Login</H4CardNavTab>
            </WhiteText>
          </ButtonMagenta>
        </StartButtonContainer>
      </StartContainer>
    </SafeArea>
  );
}
