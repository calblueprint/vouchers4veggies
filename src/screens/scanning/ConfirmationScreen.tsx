import React from 'react';
import { H1Heading, H4CardNavTab } from '../../../assets/Fonts';
import {
  ButtonContainer,
  SafeArea,
  WhiteText,
  DarkGrayText,
  ConfirmationTitleContainer,
} from './styles';
import { ButtonMagenta, ButtonWhite } from '../../../assets/Components';
import { ScannerStackScreenProps } from '../../navigation/types';
import BackButton from '../../components/common/BackButton';

export default function ConfirmationScreen({
  route,
  navigation,
}: ScannerStackScreenProps<'ConfirmationScreen'>) {
  const { count } = route.params;

  return (
    <SafeArea>
      {BackButton(() => navigation.goBack())}

      <ConfirmationTitleContainer>
        <H1Heading
          style={{ textAlign: 'center' }}
        >{`You submitted ${count}\n invoices!`}</H1Heading>
      </ConfirmationTitleContainer>

      <ButtonContainer>
        <ButtonWhite onPress={() => navigation.navigate('Transactions')}>
          <DarkGrayText>
            <H4CardNavTab>Review Invoices</H4CardNavTab>
          </DarkGrayText>
        </ButtonWhite>
      </ButtonContainer>

      <ButtonContainer>
        <ButtonMagenta
          onPress={() => navigation.navigate('ManualVoucherScreen')}
        >
          <WhiteText>
            <H4CardNavTab>Submit More</H4CardNavTab>
          </WhiteText>
        </ButtonMagenta>
      </ButtonContainer>
    </SafeArea>
  );
}
