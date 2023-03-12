import React from 'react';
import { ButtonMagenta, ButtonWhite } from '../../../assets/Components';
import { H1Heading, H4CardNavTab } from '../../../assets/Fonts';
import { AuthStackScreenProps } from '../../navigation/types';
import StandardHeader from '../../components/common/StandardHeader';
import StandardLogo from '../../components/common/StandardLogo';

import {
  ButtonContainer,
  DarkGrayText,
  LoginContainer,
  Header,
  StartContainer,
  WhiteText,
  SafeArea,
} from './styles';

export default function StartScreen({
  navigation,
}: AuthStackScreenProps<'Start'>) {
  return (
    <SafeArea>
      <LoginContainer>
        {/* logo placeholder */}
        <StandardHeader>
          <Header>
            <StandardLogo />
          </Header>
        </StandardHeader>

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
    </SafeArea>
  );
}
