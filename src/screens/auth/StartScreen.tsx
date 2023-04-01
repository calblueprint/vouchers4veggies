import React from 'react';
import { ButtonMagenta, SafeArea } from '../../../assets/Components';
import { H1Heading, H4CardNavTab, WhiteText } from '../../../assets/Fonts';
import { AuthStackScreenProps } from '../../navigation/types';
import StandardLogo from '../../components/common/StandardLogo';
import { ButtonContainer, StartContainer } from './styles';

export default function StartScreen({
  navigation,
}: AuthStackScreenProps<'Start'>) {
  return (
    <SafeArea>
      <StartContainer>
        <StandardLogo />
        <H1Heading>{"Hello! Let's get\nyou started."}</H1Heading>

        <ButtonContainer>
          <ButtonMagenta onPress={() => navigation.navigate('Login')}>
            <WhiteText>
              <H4CardNavTab>Login</H4CardNavTab>
            </WhiteText>
          </ButtonMagenta>
        </ButtonContainer>
      </StartContainer>
    </SafeArea>
  );
}
