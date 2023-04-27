import React from 'react';
import { ButtonMagenta, SafeArea } from '../../../assets/Components';
import {
  Body1Text,
  H1Heading,
  H4CardNavTab,
  WhiteText,
} from '../../../assets/Fonts';
import { ScannerStackScreenProps } from '../../navigation/types';
import StandardLogo from '../../components/common/StandardLogo';
import { ButtonContainer, HeroContainer, StartContainer } from './styles';

export default function VoucherEntryStartScreen({
  navigation,
}: ScannerStackScreenProps<'VoucherEntryStartScreen'>) {
  return (
    <SafeArea>
      <StartContainer>
        <HeroContainer>
          <StandardLogo />
          <H1Heading>Add Vouchers</H1Heading>
          <Body1Text>
            Start submitting vouchers by adding them manually or scanning their
            barcode.
          </Body1Text>
        </HeroContainer>
        <ButtonContainer>
          <ButtonMagenta
            onPress={() => navigation.navigate('VoucherEntryNavigator')}
          >
            <WhiteText>
              <H4CardNavTab>Start submitting</H4CardNavTab>
            </WhiteText>
          </ButtonMagenta>
        </ButtonContainer>
      </StartContainer>
    </SafeArea>
  );
}
