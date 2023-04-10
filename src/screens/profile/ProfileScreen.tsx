import React, { useEffect, useState } from 'react';
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
  const [vendorName, setVendorName] = useState<String>('');
  const [vendorEmail, setVendorEmail] = useState<String>('');

  useEffect(() => {
    const fetchData = async () => {
      if (vendorUuid) {
        const vendor = await getVendor(vendorUuid);
        setVendorName(vendor.name);
        setVendorEmail(vendor.email);
      }
    };
    fetchData();
  }, [vendorUuid]);
  return (
    <SafeArea>
      <StandardHeader>
        <StandardLogo />
      </StandardHeader>
      <MainProfileContainer>
        <HeadingContainer>
          {/* TODO: Fetch real vendor name using AuthContext */}
          <H2Heading>{vendorName}</H2Heading>
        </HeadingContainer>
      </MainProfileContainer>
      <Row>
        <LeftAlignContainer>
          <Body1Text>Email</Body1Text>
          <H4CardNavTab>{vendorEmail}</H4CardNavTab>
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
