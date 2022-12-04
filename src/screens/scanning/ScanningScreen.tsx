import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/AntDesign';
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
import {
  ButtonContainer,
  LogoContainer,
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
import VoucherModal from '../../components/VoucherModal/VoucherModal';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const v4vLogo = require('../../../assets/logo-1.png');

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
    <SafeArea>
      {/* <VoucherModal modalVisible setModalVisible={undefined} /> */}
      {scanCounter === 0 ? (
        <Header>
          <LogoContainer source={v4vLogo} />
          <AddManuallyButton
            onPress={() => navigation.navigate('ManualVoucherScreen')}
          >
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
          <AddManuallyButton
            onPress={() => navigation.navigate('ManualVoucherScreen')}
          >
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

      {scanCounter === 0 ? (
        <ButtonMagenta onPress={() => setScanned(false)}>
          <ButtonTextWhite>Scan</ButtonTextWhite>
        </ButtonMagenta>
      ) : (
        <ButtonContainer>
          <ButtonWhite disabled={!scanned} onPress={() => setScanned(false)}>
            <ButtonTextMagenta>Scan Again</ButtonTextMagenta>
          </ButtonWhite>
          <ButtonMagenta
          // onPress={() => navigation.navigate('ReviewScreen')}
          >
            <ButtonTextWhite>Review & Submit</ButtonTextWhite>
          </ButtonMagenta>
        </ButtonContainer>
      )}
    </SafeArea>
  );
}
