import React, { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { shouldUseActivityState } from 'react-native-screens';
// import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { start } from 'repl';
import {
  H1Heading,
  Body1Text,
  H3Subheading,
  H4CardNavTab,
  H2Heading,
  ButtonTextWhite,
} from '../../../assets/Fonts';
import { signOut } from '../../utils/authUtils';
import { useAuthContext } from '../auth/AuthContext';
import {
  HeadingContainer,
  ButtonContainer,
  ButtonBlank,
  MagentaButtonContainer,
  ButtonPasswordContainer,
  EmailText,
  ButtonPhoneContainer,
  ButtonEmailContainer,
  ButtonBottomContainer,
  LogoContainer,
} from './styles';
import { ButtonMagenta } from '../scanning/styles';
import { AuthStackScreenProps } from '../../navigation/types';
// import { DarkGrayText } from '../auth/styles';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const v4vLogo = require('../../../assets/logo-1.png');

export default function ProfileScreen({
  navigation,
}: AuthStackScreenProps<'Start'>) {
  const { dispatch } = useAuthContext();
  const [name, setName] = useState(0);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <View>
        {/* logo placeholder */}
        <LogoContainer source={v4vLogo} />
      </View>
      <View>
        <HeadingContainer>Hi, Derby Food Market!</HeadingContainer>
        <ButtonEmailContainer>
          <ButtonBlank title="Email" color="black" />
          <EmailText> Email</EmailText>
          <H4CardNavTab> email@email.com</H4CardNavTab>
        </ButtonEmailContainer>
        <ButtonPhoneContainer>
          <ButtonBlank title="Phone Number" color="black" />
          <EmailText> Phone Number</EmailText>
          <H4CardNavTab>(123) 456-7890</H4CardNavTab>
        </ButtonPhoneContainer>
        <ButtonPasswordContainer>
          <ButtonBlank title="Password" color="black" />
          <EmailText> Password</EmailText>
          <H4CardNavTab> ............</H4CardNavTab>
        </ButtonPasswordContainer>
        <ButtonBottomContainer>
          <ButtonBlank title="" color="black" />
        </ButtonBottomContainer>
        <MagentaButtonContainer>
          <ButtonMagenta onPress={signOut}>
            <ButtonTextWhite>Log Out</ButtonTextWhite>
          </ButtonMagenta>
        </MagentaButtonContainer>
      </View>
    </>
  );
}
