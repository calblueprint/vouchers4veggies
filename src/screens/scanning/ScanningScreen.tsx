import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
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
import StandardHeader from '../../components/common/StandardHeader';

import {
  ButtonContainer,
  ScannerContainer,
  TitleContainer,
  VoucherCounter,
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
// import VoucherModal from '../../components/VoucherModal/VoucherModal';
import { useScanningContext } from './ScanningContext';

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

  // const showToast = () => {
  //   Toast.show({
  //     type: 'success',
  //     position: 'top',
  //     topOffset: 50,
  //     text1: 'Voucher Scanned!',
  //     visibilityTime: 2000,
  //   });
  // };

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data } = scanningResult;
      setScanned(true);
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      // showToast();
      navigation.navigate('ConfirmValueScreen', {
        serialNumber: Number(data),
      });
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
      <StandardHeader topMargin="4%">
        {voucherMap.size === 0 ? (
          <StandardLogo />
        ) : (
          <VoucherCounter>
            <CounterText>{voucherMap.size}</CounterText>
          </VoucherCounter>
        )}
        <AddManuallyButton
          onPress={() => navigation.navigate('ManualVoucherScreen')}
        >
          <ButtonTextBlack>
            <Icon name="pluscircleo" size={14} color={Colors.midBlack} />
            {'  '}
            Add Manually
          </ButtonTextBlack>
        </AddManuallyButton>
      </StandardHeader>

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

      <ButtonContainer>
        <ButtonWhite disabled={!scanned} onPress={() => setScanned(false)}>
          <ButtonTextMagenta>Scan Again</ButtonTextMagenta>
        </ButtonWhite>
        <ButtonMagenta onPress={() => navigation.navigate('ReviewScreen')}>
          <ButtonTextWhite>Review & Submit</ButtonTextWhite>
        </ButtonMagenta>
      </ButtonContainer>
      <Toast />
    </SafeArea>
  );
}
