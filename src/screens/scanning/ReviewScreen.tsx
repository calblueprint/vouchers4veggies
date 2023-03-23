import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Alert, FlatList } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import {
  ButtonTextBlack,
  Body1Text,
  ButtonTextWhite,
  CenterText,
  CounterText,
  H2Heading,
  MagentaText,
  ButtonTextMagenta,
} from '../../../assets/Fonts';
import StandardLogo from '../../components/common/StandardLogo';
import {
  ButtonContainer,
  ScannerContainer,
  TitleContainer,
  VoucherCounter,
  Header,
  BodyContainer,
  SafeArea,
} from './styles';
import {
  AddManuallyButton,
  ButtonMagenta,
  ButtonWhite,
} from '../../../assets/Components';
import Colors from '../../../assets/Colors';
import { ScannerStackScreenProps } from '../../navigation/types';
import {
  LogoContainer,
  TransactionsContainer,
  StartOfListView,
} from '../transactions/styles';
import { CardContainer } from '../../components/common/styles';
import { useScanningContext } from './ScanningContext';
import ReviewVoucherCard from '../../components/scanning/ReviewVoucherCard';
import { validateVoucherAmount } from '../../utils/validationUtils';
import { editVoucher } from '../../utils/scanningUtils';

export default function ReviewScreen({
  navigation,
}: ScannerStackScreenProps<'ReviewScreen'>) {
  const { voucherMap, dispatch } = useScanningContext();
  const voucherArray = Array.from(voucherMap, ([serialNumber, value]) => ({
    serialNumber,
    value,
  }));

  return (
    <SafeArea>
      <CardContainer>
        <StartOfListView />
        <FlatList
          data={voucherArray}
          renderItem={({ item }) => (
            <ReviewVoucherCard
              serialNumber={item.serialNumber}
              value={item.value}
            />
          )}
          keyExtractor={item => item.serialNumber.toString()}
        />
      </CardContainer>
    </SafeArea>
  );
}
