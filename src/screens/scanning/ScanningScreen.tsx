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
  ButtonContainer,
  ScannerContainer,
  BodyContainer,
  VoucherCountContainer,
} from './styles';
import { ButtonMagenta, ButtonWhite } from '../../../assets/Components';
import { ScannerStackScreenProps } from '../../navigation/types';
import { useScanningContext } from './ScanningContext';
import { validateSerialNumber } from '../../database/queries';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
  },
});

export default function ScanningScreen({
  navigation,
}: ScannerStackScreenProps<'ScanningScreen'>) {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type] = useState<never>(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState<boolean>(true);
  const { voucherMap } = useScanningContext();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
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

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <BodyContainer>
        <Body1Text>
          <CenterText>
            Point your camera at the barcode and line it up with the{' '}
            <MagentaText>purple box.</MagentaText>
          </CenterText>
        </Body1Text>
      </BodyContainer>

      <ScannerContainer>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          type={type}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.code39]}
          style={[StyleSheet.absoluteFillObject, styles.container]}
        />
      </ScannerContainer>

      <ButtonContainer>
        <ButtonMagenta disabled={!scanned} onPress={() => setScanned(false)}>
          <ButtonTextWhite>Scan</ButtonTextWhite>
        </ButtonMagenta>

        <ButtonWhite
          onPress={() => navigation.navigate('ReviewScreen')}
          disabled={voucherMap.size === 0}
        >
          <ButtonTextMagenta>Review and Submit</ButtonTextMagenta>
        </ButtonWhite>
        <VoucherCountContainer>
          <Body1Text>Voucher Count: {voucherMap.size}</Body1Text>
        </VoucherCountContainer>
      </ButtonContainer>
    </>
  );
}
