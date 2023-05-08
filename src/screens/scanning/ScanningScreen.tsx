import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import {
  Body1Text,
  ButtonTextWhite,
  CenterText,
  MagentaText,
  ButtonTextMagenta,
} from '../../../assets/Fonts';
import {
  ScannerContainer,
  BodyContainer,
  styles,
  LoadingContainer,
} from './styles';
import { ButtonMagenta, ButtonWhite } from '../../../assets/Components';
import { VoucherEntryNavigationProps } from '../../navigation/types';
import { useScanningContext } from './ScanningContext';
import { validateSerialNumber } from '../../database/queries';
import LoadingSpinner from '../../components/common/LoadingSpinner';

enum permissions {
  LOADING,
  DENIED,
  GRANTED,
}

type ScanningScreenProps = {
  navigation: VoucherEntryNavigationProps;
};

export default function ScanningScreen({ navigation }: ScanningScreenProps) {
  const [hasPermission, setHasPermission] = useState(permissions.LOADING);
  const [type] = useState<never>(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState<boolean>(true);
  const { voucherMap } = useScanningContext();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(
        status === 'granted' ? permissions.GRANTED : permissions.DENIED,
      );
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data } = scanningResult;
      const serialNumber = Number(data);
      setScanned(true);

      const result = await validateSerialNumber(serialNumber);
      const { ok } = result;
      // `ok` is true indicates valid serial number input
      if (ok) {
        // provides the maxVoucherValue to the confirm value screen to autofill the text box
        navigation.navigate('ConfirmValueScreen', {
          serialNumber,
          maxValue: result.voucherRange.maxValue,
          type: result.voucherRange.type,
        });
      } else {
        Alert.alert('Oh no! Invalid serial number.', 'Please try again', [
          {
            text: 'OK',
          },
        ]);
      }
    }
  };

  if (hasPermission === permissions.LOADING) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }
  if (hasPermission === permissions.DENIED) {
    return <Text>No access to camera</Text>;
  }

  const onScan = () => setScanned(false);

  const onNavigateToReviewScreen = () => navigation.navigate('ReviewScreen');

  return (
    <BodyContainer>
      <CenterText>
        <Body1Text>
          Point your camera at the barcode and line it up with the{' '}
          <MagentaText>purple box.</MagentaText>
        </Body1Text>
      </CenterText>

      <ScannerContainer>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          type={type}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.code39]}
          style={[StyleSheet.absoluteFillObject, styles.container]}
        />
      </ScannerContainer>

      <ButtonMagenta disabled={!scanned} onPress={onScan}>
        <ButtonTextWhite>Scan</ButtonTextWhite>
      </ButtonMagenta>

      <ButtonWhite
        onPress={onNavigateToReviewScreen}
        disabled={voucherMap.size === 0}
      >
        <ButtonTextMagenta>Review and Submit</ButtonTextMagenta>
      </ButtonWhite>
      <Body1Text>Voucher Count: {voucherMap.size}</Body1Text>
    </BodyContainer>
  );
}
