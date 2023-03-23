import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../../assets/Colors';
import {
  H4CardNavTab,
  H2Heading,
  ButtonTextWhite,
  EmailText,
} from '../../../assets/Fonts';
import { signOut } from '../../utils/authUtils';
import { useAuthContext } from '../auth/AuthContext';
import {
  HeadingContainer,
  ButtonBlank,
  MagentaButtonContainer,
  ButtonBottomContainer,
  IconContainer,
  MainProfileContainer,
  ButtonInfoContainer,
} from './styles';
import { ProfileStackScreenProps } from '../../navigation/types';
import { ButtonMagenta } from '../../../assets/Components';
import StandardLogo from '../../components/common/StandardLogo';

export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<'ProfileScreen'>) {
  const { dispatch } = useAuthContext();
  const handleSignOut = async () => signOut(dispatch);

  return (
    <>
      <StandardLogo />
      <MainProfileContainer>
        <HeadingContainer>
          {/* TODO: Fetch real vendor name using AuthContext */}
          <H2Heading>Hi, Derby Food Market!</H2Heading>
        </HeadingContainer>
      </MainProfileContainer>
      <ButtonInfoContainer
        onPress={() => navigation.navigate('EditPhoneNumber')}
      >
        <ButtonBlank />
        <IconContainer>
          <Icon name="right" size={20} color={Colors.midGray} />
        </IconContainer>
        <MainProfileContainer>
          <EmailText>Email</EmailText>
          {/* TODO: Fetch real vendor email using AuthContext */}
          <H4CardNavTab>email@email.com</H4CardNavTab>
        </MainProfileContainer>
      </ButtonInfoContainer>
      <ButtonInfoContainer
        onPress={() => navigation.navigate('EditEmailScreen')}
      >
        <ButtonBlank />
        <IconContainer>
          <Icon name="right" size={20} color={Colors.midGray} />
        </IconContainer>
        <MainProfileContainer>
          {/* TODO: Fetch real vendor number using AuthContext */}
          <EmailText>Phone Number</EmailText>
          <H4CardNavTab>(123) 456-7890</H4CardNavTab>
        </MainProfileContainer>
      </ButtonInfoContainer>
      <ButtonInfoContainer>
        <ButtonBlank />
        <IconContainer>
          <Icon name="right" size={20} color={Colors.midGray} />
        </IconContainer>
        <MainProfileContainer>
          <EmailText>Password</EmailText>
          {/* TODO: Fetch real vendor password using AuthContext */}
          <H4CardNavTab>............</H4CardNavTab>
        </MainProfileContainer>
      </ButtonInfoContainer>
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
