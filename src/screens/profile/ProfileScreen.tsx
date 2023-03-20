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
import { useAuthContext } from '../auth/AuthContext';
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
  const { dispatch } = useAuthContext();
  const handleSignOut = async () => signOut(dispatch);

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
      </MainProfileContainer>
      <ButtonEmailContainer
        onPress={() => navigation.navigate('EditPhoneNumber')}
      >
        <ButtonBlank />
        <IconContainer>
          <Icon name="right" size={20} color={Colors.midGray} />
        </IconContainer>
        <MainProfileContainer>
          <EmailText>Email</EmailText>
          <H4CardNavTab>email@email.com</H4CardNavTab>
        </MainProfileContainer>
      </ButtonEmailContainer>
      <ButtonPhoneContainer
        onPress={() => navigation.navigate('EditEmailScreen')}
      >
        <ButtonBlank />
        <IconContainer>
          <Icon name="right" size={20} color={Colors.midGray} />
        </IconContainer>
        <MainProfileContainer>
          <EmailText>Phone Number</EmailText>
          <H4CardNavTab>(123) 456-7890</H4CardNavTab>
        </MainProfileContainer>
      </ButtonPhoneContainer>
      <ButtonPasswordContainer>
        <ButtonBlank />
        <IconContainer>
          <Icon name="right" size={20} color={Colors.midGray} />
        </IconContainer>
        <MainProfileContainer>
          <EmailText>Password</EmailText>
          <H4CardNavTab>............</H4CardNavTab>
        </MainProfileContainer>
      </ButtonPasswordContainer>
      <ButtonBottomContainer>
        <ButtonBlank />
      </ButtonBottomContainer>
      <MagentaButtonContainer>
        <ButtonMagenta onPress={handleSignOut}>
          <ButtonTextWhite>Log Out</ButtonTextWhite>
        </ButtonMagenta>
      </MagentaButtonContainer>
    </>
  );
}
