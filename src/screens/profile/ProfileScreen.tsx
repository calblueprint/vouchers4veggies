import React, { useEffect, useState } from 'react';
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
import {
  ButtonMagenta,
  Row,
  SafeArea,
  StartOfListView,
} from '../../../assets/Components';
import StandardLogo from '../../components/common/StandardLogo';
import StandardHeader from '../../components/common/StandardHeader';
import { getVendor } from '../../database/queries';

export default function ProfileScreen() {
  const { dispatch } = useAuthContext();
  const handleSignOut = async () => signOut(dispatch);
  const { vendorUuid } = useAuthContext();
  const [vendorName, setVendorName] = useState<string>(' ');
  const [vendorEmail, setVendorEmail] = useState<string>(' ');
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
          <H2Heading>{vendorName}</H2Heading>
        </HeadingContainer>
      </MainProfileContainer>
      <StartOfListView />
      <Row>
        <LeftAlignContainer>
          <Body1Text>Email</Body1Text>
          <H4CardNavTab>{vendorEmail}</H4CardNavTab>
        </LeftAlignContainer>
      </Row>
      <MagentaButtonContainer>
        <ButtonMagenta onPress={handleSignOut}>
          <ButtonTextWhite>Log Out</ButtonTextWhite>
        </ButtonMagenta>
      </MagentaButtonContainer>
    </SafeArea>
  );
}
