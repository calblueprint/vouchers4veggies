import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
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
  ContactUsContainer,
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
import Colors from '../../../assets/Colors';
import { Styles } from '../../components/transactions/styles';
import BackButton from '../../components/common/BackButton';
import { ProfileStackScreenProps } from '../../navigation/types';

export default function ContactUsScreen({
  navigation,
}: ProfileStackScreenProps<'ContactUsScreen'>) {
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
        <BackButton onPress={() => navigation.goBack()} />
      </StandardHeader>
      <MainProfileContainer>
        <HeadingContainer>
          <H2Heading>Contact Us</H2Heading>
        </HeadingContainer>
      </MainProfileContainer>
      <StartOfListView />
      <Row>
        <LeftAlignContainer>
          <Body1Text>Phone Number</Body1Text>
          <H4CardNavTab>1-833-VEG4YOU</H4CardNavTab>
        </LeftAlignContainer>
      </Row>
      <TouchableOpacity>
        <Row>
          <LeftAlignContainer>
            <Body1Text>Location</Body1Text>
            <H4CardNavTab>put address here lol</H4CardNavTab>
          </LeftAlignContainer>
        </Row>
      </TouchableOpacity>
      <MagentaButtonContainer>
        <ButtonMagenta onPress={handleSignOut}>
          <ButtonTextWhite>Email Us</ButtonTextWhite>
        </ButtonMagenta>
      </MagentaButtonContainer>
    </SafeArea>
  );
}
