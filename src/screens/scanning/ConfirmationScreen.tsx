import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  H1Heading,
  H4CardNavTab,
  WhiteText,
  DarkGrayText,
  CenterText,
} from '../../../assets/Fonts';
import {
  ButtonMagenta,
  ButtonWhite,
  SafeArea,
  StartContainer,
  TitleContainer,
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

  const onNavigateToInvoices = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'VoucherEntryStartScreen' }],
    });
    nestedNavigation.navigate('Transactions');
  };

  const onSubmitMore = () => navigation.navigate('VoucherEntryStartScreen');

  useEffect(() => {
    newInvoice(dispatch);
  }, [dispatch]);

  return (
    <SafeArea>
      <StartContainer>
        <TitleContainer>
          <CenterText>
            <H1Heading>
              {count === 1
                ? `You submitted ${count}\n voucher!`
                : `You submitted ${count}\n vouchers!`}
            </H1Heading>
          </CenterText>
        </TitleContainer>

        <ButtonWhite onPress={onNavigateToInvoices}>
          <DarkGrayText>
            <H4CardNavTab>Review Invoices</H4CardNavTab>
          </DarkGrayText>
        </ButtonWhite>

        <ButtonMagenta onPress={onSubmitMore}>
          <WhiteText>
            <H4CardNavTab>Submit More</H4CardNavTab>
          </WhiteText>
        </ButtonMagenta>
      </StartContainer>
    </SafeArea>
  );
}
