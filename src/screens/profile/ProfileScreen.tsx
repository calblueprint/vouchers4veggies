import React, { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { shouldUseActivityState } from 'react-native-screens';
import Icon from 'react-native-vector-icons/AntDesign';
import { start } from 'repl';
import Colors from '../../../assets/Colors';
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
  IconContainer,
} from './styles';
import { ButtonMagenta } from '../scanning/styles';
import {
  AuthStackScreenProps,
  ProfileStackScreenProps,
} from '../../navigation/types';
// import { DarkGrayText } from '../auth/styles';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const v4vLogo = require('../../../assets/logo-1.png');

export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<'ProfileScreen'>) {
  return (
    <>
      <View>
        {/* logo placeholder */}
        <LogoContainer source={v4vLogo} />
      </View>
      <View>
        <HeadingContainer>Hi, Derby Food Market!</HeadingContainer>
        <ButtonEmailContainer
          onPress={() => navigation.navigate('EditEmailScreen')}
        >
          <ButtonBlank />
          <IconContainer>
            <Icon name="right" size={20} color={Colors.midGray} />
          </IconContainer>
          <EmailText> Email</EmailText>
          <H4CardNavTab> email@email.com</H4CardNavTab>
        </ButtonEmailContainer>
        <ButtonPhoneContainer
          onPress={() => navigation.navigate('EditPhoneNumber')}
        >
          <ButtonBlank title="Phone Number" color="black" />
          <IconContainer>
            <Icon name="right" size={20} color={Colors.midGray} />
          </IconContainer>
          <EmailText> Phone Number</EmailText>
          <H4CardNavTab>(123) 456-7890</H4CardNavTab>
        </ButtonPhoneContainer>
        <ButtonPasswordContainer>
          <ButtonBlank title="Password" color="black" />
          <IconContainer>
            <Icon name="right" size={20} color={Colors.midGray} />
          </IconContainer>
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
