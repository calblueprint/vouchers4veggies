import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../../assets/Colors';
import {
  H4CardNavTab,
  H2Heading,
  ButtonTextWhite,
} from '../../../assets/Fonts';
import { signOut } from '../../utils/authUtils';
import {
  HeadingContainer,
  ButtonBlank,
  MagentaButtonContainer,
  ButtonPasswordContainer,
  EmailText,
  ButtonPhoneContainer,
  ButtonEmailContainer,
  ButtonBottomContainer,
  LogoContainer,
  IconContainer,
  MainProfileContainer,
} from './styles';
import { ProfileStackScreenProps } from '../../navigation/types';
import { ButtonMagenta } from '../../../assets/Components';
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
      <MainProfileContainer>
        <HeadingContainer>
          <H2Heading>Hi, Derby Food Market!</H2Heading>
        </HeadingContainer>
        <ButtonEmailContainer
          onPress={() => navigation.navigate('EditPhoneNumber')}
        >
          <ButtonBlank />
          <IconContainer>
            <Icon name="right" size={20} color={Colors.midGray} />
          </IconContainer>
          <EmailText> Email</EmailText>
          <H4CardNavTab> email@email.com</H4CardNavTab>
        </ButtonEmailContainer>
        <ButtonPhoneContainer
          onPress={() => navigation.navigate('EditEmailScreen')}
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
      </MainProfileContainer>
    </>
  );
}
