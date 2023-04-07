import React, { useEffect } from 'react';
import { ButtonTextWhite, H2Heading } from '../../../assets/Fonts';
import { signOut } from '../../utils/authUtils';
import { useAuthContext } from '../auth/AuthContext';
import {
  ButtonMagenta,
  CardContainer,
  SafeArea,
  StartOfListView,
} from '../../../assets/Components';
import StandardHeader from '../../components/common/StandardHeader';
import StandardLogo from '../../components/common/StandardLogo';
import { TitleContainer } from './styles';
import { ProfileStackScreenProps } from '../../navigation/types';
import { getVendorByEmail } from '../../database/queries';

export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<'ProfileScreen'>) {
  const { dispatch } = useAuthContext();

  useEffect(user => {
    const fetchData = async () => {
      try {
        const vendor = await getVendorByEmail(user.email);
        console.log(vendor);
      } catch (error) {
        console.log('fetch vendor on profile screen', error);
      }
    };
  }, []);

  return (
    <SafeArea>
      <StandardHeader>
        <StandardLogo />
      </StandardHeader>

      <TitleContainer>
        <H2Heading>Profile</H2Heading>
      </TitleContainer>

      <CardContainer>
        <StartOfListView />
      </CardContainer>

      <ButtonMagenta onPress={() => signOut(dispatch)}>
        <ButtonTextWhite>Sign Out</ButtonTextWhite>
      </ButtonMagenta>
    </SafeArea>
  );
}
