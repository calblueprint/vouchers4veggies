import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import {
  Body_1_Text,
  ButtonTextBlack,
  ButtonTextWhite,
  CenterText,
  CounterText,
  H2Heading,
  H4_Card_Nav_Tab,
  MagentaText,
} from '../../../assets/Fonts';
import {
  LogoContainer,
  PageContainer,
  ScannerContainer,
  TitleContainer,
  VoucherCounter,
  ButtonContainer,
  Header,
  BodyContainer,
  SafeArea,
} from './styles';
import {
  AddManuallyButton,
  ButtonMagenta,
  ButtonWhite,
} from '../../../assets/Components';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../assets/Colors';

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
    const { type, data, bounds: { origin } = {} } = scanningResult;
    // const { x, y } = origin;
    incrementScanned(scanCounter + 1);
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeArea>
      <PageContainer>
        {scanCounter === 0 ? (
          <Header>
            <LogoContainer source={v4vLogo}></LogoContainer>
            <AddManuallyButton>
              <ButtonTextBlack>
                <Icon name="pluscircleo" size={14} color={Colors.midBlack} />
                {'  '}
                Add Manually
              </ButtonTextBlack>
            </AddManuallyButton>
          </Header>
        ) : (
          <Header>
            <VoucherCounter>
              <CounterText>{scanCounter}</CounterText>
            </VoucherCounter>
            <AddManuallyButton>
              <ButtonTextBlack>
                <Icon name="pluscircleo" size={14} color={Colors.midBlack} />
                {'  '}
                Add Manually
              </ButtonTextBlack>
            </AddManuallyButton>
          </Header>
        )}

        <BodyContainer>
          <TitleContainer>
            <CenterText>
              <H2Heading>Scan your voucher(s).</H2Heading>
            </CenterText>
          </TitleContainer>
          <Body_1_Text>
            <CenterText>
              Point your camera at the barcode and line it up with the{' '}
              <MagentaText>purple box.</MagentaText>
            </CenterText>
          </Body_1_Text>
        </BodyContainer>

        <ScannerContainer>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            type={type}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.code39]}
            style={[StyleSheet.absoluteFillObject, styles.container]}
          />
        </ScannerContainer>

        {scanCounter > 0 && (
          <ButtonContainer>
            <ButtonMagenta>
              <ButtonTextWhite>Review & Submit</ButtonTextWhite>
            </ButtonMagenta>
          </ButtonContainer>
        )}
      </PageContainer>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
  },
});

export default ScanningScreen;
