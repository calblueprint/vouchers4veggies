import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import {
  Body_1_Text,
  ButtonTextWhite,
  CenterText,
  CounterText,
  H2Heading,
  MagentaText,
} from '../../../assets/Fonts';
import {
  ButtonMagenta,
  Container,
  HeaderContainer,
  LogoContainer,
  PageContainer,
  ScannerContainer,
  styles,
  TitleContainer,
  TopContainer,
  VoucherCounter,
} from './styles';
import styled from 'styled-components';

const v4vLogo = require('../../../assets/logo-1.png');

const ScanningScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState<any>(BarCodeScanner.Constants.Type.back);
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
      const { type, data, bounds: { origin } = {} } = scanningResult;
      // const { x, y } = origin;
      incrementScanned(scanCounter + 1);
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
        <TopContainer>
          <LogoContainer source={v4vLogo}></LogoContainer>
          <VoucherCounter>
            <CounterText>{scanCounter}</CounterText>
          </VoucherCounter>
        </TopContainer>
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
            style={[StyleSheet.absoluteFillObject, styles.container]}
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

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
  },
});

export default ScanningScreen;
