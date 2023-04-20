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
  IconContainer,
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
import { ProfileStackScreenProps } from '../../navigation/types';

export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<'ProfileScreen'>) {
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
          <H2Heading>Hi, {vendorName}!</H2Heading>
        </HeadingContainer>
      </MainProfileContainer>
      <StartOfListView />
      <Row>
        <LeftAlignContainer>
          <Body1Text>Email</Body1Text>
          <H4CardNavTab>{vendorEmail}</H4CardNavTab>
        </LeftAlignContainer>
      </Row>
      <TouchableOpacity onPress={() => navigation.navigate('ContactUsScreen')}>
        <Row>
          <IconContainer>
            <Icon2
              name="phone"
              size={25}
              style={Styles.icon}
              color={Colors.darkGray}
            />
          </IconContainer>
          <LeftAlignContainer>
            <H4CardNavTab>Contact Us</H4CardNavTab>
          </LeftAlignContainer>
          <Icon
            name="right"
            size={25}
            style={Styles.icon}
            color={Colors.midGray}
          />
        </Row>
      </TouchableOpacity>
      <MagentaButtonContainer>
        <ButtonMagenta onPress={handleSignOut}>
          <ButtonTextWhite>Log Out</ButtonTextWhite>
        </ButtonMagenta>
      </MagentaButtonContainer>
    </SafeArea>
  );
}
