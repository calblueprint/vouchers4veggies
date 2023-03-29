import React, { useEffect } from 'react';
import { H1Heading, H4CardNavTab } from '../../../assets/Fonts';
import {
  ButtonContainer,
  WhiteText,
  DarkGrayText,
  ConfirmationTitleContainer,
} from './styles';
import {
  ButtonMagenta,
  ButtonWhite,
  SafeArea,
} from '../../../assets/Components';
import { ScannerStackScreenProps } from '../../navigation/types';
import BackButton from '../../components/common/BackButton';
import { newInvoice } from '../../utils/scanningUtils';
import { useScanningContext } from './ScanningContext';
import StandardHeader from '../../components/common/StandardHeader';

export default function ConfirmationScreen({
  route,
  navigation,
}: ScannerStackScreenProps<'ConfirmationScreen'>) {
  const { count } = route.params;
  const { dispatch } = useScanningContext();

  useEffect(() => {
    newInvoice(dispatch);
  }, [dispatch]);

  return (
    <SafeArea>
      <StandardHeader>
        <BackButton onPress={() => navigation.goBack()} />
      </StandardHeader>

      <ConfirmationTitleContainer>
        <H1Heading
          style={{ textAlign: 'center' }}
        >{`You submitted ${count}\n invoices!`}</H1Heading>
      </ConfirmationTitleContainer>

      <ButtonContainer>
        <ButtonWhite onPress={() => navigation.navigate('TransactionsScreen')}>
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
