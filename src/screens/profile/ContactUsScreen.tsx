import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import {
  H4CardNavTab,
  H2Heading,
  ButtonTextWhite,
  Body1Text,
} from '../../../assets/Fonts';
import { ButtonMagentaContainer } from './styles';
import {
  ButtonMagenta,
  Card,
  Column,
  SafeArea,
  StartOfListView,
  TitleContainer,
} from '../../../assets/Components';
import StandardHeader from '../../components/common/StandardHeader';
import BackButton from '../../components/common/BackButton';
import { ProfileStackScreenProps } from '../../navigation/types';

export default function ContactUsScreen({
  navigation,
}: ProfileStackScreenProps<'ContactUsScreen'>) {
  const onPressBackButton = () => navigation.goBack();

  const onPressEmailUs = () =>
    Linking.openURL('mailto: v4vdevelopment@gmail.com');

  return (
    <SafeArea>
      <StandardHeader>
        <BackButton onPress={onPressBackButton} />
      </StandardHeader>

      <TitleContainer>
        <H2Heading>Contact Us</H2Heading>
      </TitleContainer>

      <StartOfListView />
      <Card>
        <Column>
          <Body1Text>Phone Number</Body1Text>
          <H4CardNavTab>1-833-VEG4YOU</H4CardNavTab>
        </Column>
      </Card>
      <TouchableOpacity>
        <Card>
          <Column>
            <Body1Text>Location</Body1Text>
            <H4CardNavTab>1001 Potrero Ave, San Francisco</H4CardNavTab>
          </Column>
        </Card>
      </TouchableOpacity>

      <ButtonMagentaContainer>
        <ButtonMagenta onPress={onPressEmailUs}>
          <ButtonTextWhite>Email Us</ButtonTextWhite>
        </ButtonMagenta>
      </ButtonMagentaContainer>
    </SafeArea>
  );
}
