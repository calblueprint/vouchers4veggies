import React from 'react';
import {
  ButtonMagenta,
  SafeArea,
  StartContainer,
} from '../../../assets/Components';
import {
  Body1Text,
  H1Heading,
  H4CardNavTab,
  WhiteText,
} from '../../../assets/Fonts';
import { ScannerStackScreenProps } from '../../navigation/types';
import StandardLogo from '../../components/common/StandardLogo';
import { ButtonMagentaContainer, BodyContainer } from './styles';

export default function VoucherEntryStartScreen({
  navigation,
}: ScannerStackScreenProps<'VoucherEntryStartScreen'>) {
  const onStartSubmitting = () => navigation.navigate('VoucherEntryNavigator');

  return (
    <SafeArea>
      <StartContainer>
        <BodyContainer>
          <StandardLogo />
          <H1Heading>Add Vouchers</H1Heading>
          <Body1Text>
            Start submitting vouchers by adding them manually or scanning their
            barcode.
          </Body1Text>

          <ButtonMagentaContainer>
            <ButtonMagenta onPress={onStartSubmitting}>
              <WhiteText>
                <H4CardNavTab>Start submitting</H4CardNavTab>
              </WhiteText>
            </ButtonMagenta>
          </ButtonMagentaContainer>
        </BodyContainer>
      </StartContainer>
    </SafeArea>
  );
}
