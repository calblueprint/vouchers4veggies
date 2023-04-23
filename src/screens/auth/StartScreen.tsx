import React from 'react';
import { ButtonMagenta, SafeArea } from '../../../assets/Components';
import { H1Heading, H4CardNavTab, WhiteText } from '../../../assets/Fonts';
import { AuthStackScreenProps } from '../../navigation/types';
import { ButtonSpacing, StartContainer } from './styles';
import StartLogo from '../../components/common/StartLogo';

export default function StartScreen({
  navigation,
}: AuthStackScreenProps<'Start'>) {
  return (
    <SafeArea>
      <StartContainer>
        <StartLogo />
        <H1Heading>{"Hello! Let's get\nyou started."}</H1Heading>

        <ButtonSpacing>
          <ButtonMagenta onPress={() => navigation.navigate('Login')}>
            <WhiteText>
              <H4CardNavTab>Login</H4CardNavTab>
            </WhiteText>
          </ButtonMagenta>
        </ButtonSpacing>
      </StartContainer>
    </SafeArea>
  );
}
