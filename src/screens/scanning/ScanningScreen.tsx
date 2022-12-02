import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ButtonWhite } from '../../../assets/Components';
import {
  Body1Text,
  ButtonTextWhite,
  CenterText,
  CounterText,
  H2Heading,
  H4CardNavTab,
  MagentaText,
} from '../../../assets/Fonts';
import {
<<<<<<< HEAD
  ButtonContainer,
  ButtonMagenta,
=======
>>>>>>> 49892ea (TODO: fix bg color difference)
  HeaderContainer,
  LogoContainer,
  PageContainer,
  ScannerContainer,
  TitleContainer,
  TopContainer,
  VoucherCounter,
} from './styles';
<<<<<<< HEAD
=======
import { ButtonWhite, ButtonMagenta } from '../../../assets/Components';
>>>>>>> 49892ea (TODO: fix bg color difference)

// eslint-disable-next-line @typescript-eslint/no-var-requires
const v4vLogo = require('../../../assets/logo-1.png');

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
  },
});

export default function ScanningScreen() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type] = useState<never>(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scanCounter, incrementScanned] = useState(0);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      const { data } = scanningResult;
      incrementScanned(scanCounter + 1);
      setScanned(true);
      // eslint-disable-next-line no-alert
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView>
      <PageContainer>
        <TopContainer>
          <LogoContainer source={v4vLogo} />
          <VoucherCounter>
            <CounterText>{scanCounter}</CounterText>
          </VoucherCounter>
        </TopContainer>
        <HeaderContainer>
          <TitleContainer>
            <H2Heading>Scan your voucher(s).</H2Heading>
          </TitleContainer>
          <Body1Text>
            <CenterText>
              Point your camera at the QR code and line it up with the{' '}
              <MagentaText>purple box.</MagentaText>
            </CenterText>
          </Body1Text>
        </HeaderContainer>

        <ScannerContainer>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            type={type}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.code39]}
            style={[StyleSheet.absoluteFillObject, styles.container]}
          />
        </ScannerContainer>

        {/* need to discuss button flow */}
        {scanCounter === 0 ? (
          <ButtonMagenta disabled={!scanned} onPress={() => setScanned(false)}>
            <ButtonTextWhite>Scan</ButtonTextWhite>
          </ButtonMagenta>
        ) : (
          <ButtonContainer>
            <ButtonMagenta
              disabled={!scanned}
              onPress={() => setScanned(false)}
            >
              <ButtonTextWhite>Scan Again</ButtonTextWhite>
            </ButtonMagenta>
            <ButtonWhite>
              <H4CardNavTab>Review & Submit</H4CardNavTab>
            </ButtonWhite>
          </ButtonContainer>
        )}
      </PageContainer>
    </SafeAreaView>
  );
}
