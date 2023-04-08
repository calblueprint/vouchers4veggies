import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../../assets/Colors';
import {
  H4CardNavTab,
  H2Heading,
  ButtonTextWhite,
  Body1Text,
} from '../../../assets/Fonts';
import { signOut } from '../../utils/authUtils';
import { useAuthContext } from '../auth/AuthContext';
import {
  HeadingContainer,
  MagentaButtonContainer,
  MainProfileContainer,
  LeftAlignContainer,
} from './styles';
import { ProfileStackScreenProps } from '../../navigation/types';
import { ButtonMagenta, Row, SafeArea } from '../../../assets/Components';
import StandardLogo from '../../components/common/StandardLogo';
import StandardHeader from '../../components/common/StandardHeader';
import { Styles } from '../../components/transactions/styles';
import { getVendor } from '../../database/queries';

export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<'ProfileScreen'>) {
  const { dispatch } = useAuthContext();
  const handleSignOut = async () => signOut(dispatch);
  const { vendorUuid } = useAuthContext();

  return (
    <SafeArea>
      <StandardHeader>
        <StandardLogo />
      </StandardHeader>
      <MainProfileContainer>
        <HeadingContainer>
          {/* TODO: Fetch real vendor name using AuthContext */}
          <H2Heading>Hi, Derby Food Market!</H2Heading>
        </HeadingContainer>
      </MainProfileContainer>
      <Row>
        <LeftAlignContainer>
          <Body1Text>Email</Body1Text>
          <H4CardNavTab>email@email.com</H4CardNavTab>
        </LeftAlignContainer>
        <Icon
          name="right"
          size={25}
          style={Styles.icon}
          color={Colors.midGray}
        />
      </Row>
      <MagentaButtonContainer>
        <ButtonMagenta onPress={handleSignOut}>
          <ButtonTextWhite>Log Out</ButtonTextWhite>
        </ButtonMagenta>
      </MagentaButtonContainer>
    </SafeArea>
  );
}
