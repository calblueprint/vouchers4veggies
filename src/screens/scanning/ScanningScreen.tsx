import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import {
  Body_1_Text,
  ButtonTextWhite,
  CenterText,
  H2Heading,
  MagentaText,
} from '../../../assets/Fonts';
import {
  ButtonMagenta,
  Container,
  HeaderContainer,
  PageContainer,
  ScannerContainer,
  TitleContainer,
} from './styles';

const ScanningScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState<any>(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      const { type, data, bounds: { origin } = {} } = scanningResult;
      // const { x, y } = origin;
      setScanned(true);
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
        <HeaderContainer>
          <TitleContainer>
            <H2Heading>Scan your voucher(s).</H2Heading>
          </TitleContainer>
          <Body_1_Text>
            <CenterText>
              Point your camera at the QR code and line it up with the{' '}
              <MagentaText>purple box.</MagentaText>
            </CenterText>
          </Body_1_Text>
        </HeaderContainer>

        <ScannerContainer>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            type={type}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.code39]}
            style={[StyleSheet.absoluteFillObject]}
          />
        </ScannerContainer>

        {/* need to discuss button flow */}
        <ButtonMagenta disabled={!scanned} onPress={() => setScanned(false)}>
          <ButtonTextWhite>Scan Again</ButtonTextWhite>
        </ButtonMagenta>
      </PageContainer>
    </SafeAreaView>
  );
};

export default ScanningScreen;
