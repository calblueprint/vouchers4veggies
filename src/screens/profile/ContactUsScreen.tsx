import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import {
  H4CardNavTab,
  H2Heading,
  ButtonTextWhite,
  Body1Text,
} from '../../../assets/Fonts';
import { MagentaButtonContainer, LeftAlignContainer } from './styles';
import {
  ButtonMagenta,
  Card,
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
  return (
    <SafeArea>
      <StandardHeader>
        <BackButton onPress={() => navigation.goBack()} />
      </StandardHeader>
      <TitleContainer>
        <H2Heading>Contact Us</H2Heading>
      </TitleContainer>
      <StartOfListView />
      <Card>
        <LeftAlignContainer>
          <Body1Text>Phone Number</Body1Text>
          <H4CardNavTab>1-833-VEG4YOU</H4CardNavTab>
        </LeftAlignContainer>
      </Card>
      <TouchableOpacity>
        <Card>
          <LeftAlignContainer>
            <Body1Text>Location</Body1Text>
            <H4CardNavTab>1001 Potrero Ave, San Francisco</H4CardNavTab>
          </LeftAlignContainer>
        </Card>
      </TouchableOpacity>
      <MagentaButtonContainer>
        <ButtonMagenta
          onPress={() => Linking.openURL('mailto: v4vdevelopment@gmail.com')}
        >
          <ButtonTextWhite>Email Us</ButtonTextWhite>
        </ButtonMagenta>
      </MagentaButtonContainer>
    </SafeArea>
  );
}
