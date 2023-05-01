import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
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
import {
  BottomTabScreenProps,
  ScannerStackScreenProps,
} from '../../navigation/types';
import { newInvoice } from '../../utils/scanningUtils';
import { useScanningContext } from './ScanningContext';

export default function ConfirmationScreen({
  route,
  navigation,
}: ScannerStackScreenProps<'ConfirmationScreen'>) {
  const { count } = route.params;
  const { dispatch } = useScanningContext();
  const nestedNavigation =
    useNavigation<BottomTabScreenProps<'Transactions'>>();

  useEffect(() => {
    newInvoice(dispatch);
  }, [dispatch]);

  return (
    <SafeArea>
      <ConfirmationTitleContainer>
        <H1Heading style={{ textAlign: 'center' }}>
          {count === 1
            ? `You submitted ${count}\n voucher!`
            : `You submitted ${count}\n vouchers!`}
        </H1Heading>
      </ConfirmationTitleContainer>

      <ButtonContainer>
        <ButtonWhite
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'VoucherEntryStartScreen' }],
            });
            nestedNavigation.navigate('Transactions');
          }}
        >
          <DarkGrayText>
            <H4CardNavTab>Review Invoices</H4CardNavTab>
          </DarkGrayText>
        </ButtonWhite>
      </ButtonContainer>

      <ButtonContainer>
        <ButtonMagenta
          onPress={() => navigation.navigate('VoucherEntryStartScreen')}
        >
          <WhiteText>
            <H4CardNavTab>Submit More</H4CardNavTab>
          </WhiteText>
        </ButtonMagenta>
      </ButtonContainer>
    </SafeArea>
  );
}
