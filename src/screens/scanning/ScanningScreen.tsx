import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import {
  ButtonTextBlack,
  Body1Text,
  ButtonTextWhite,
  CenterText,
  // CounterText,
  H2Heading,
  MagentaText,
  ButtonTextMagenta,
} from '../../../assets/Fonts';
import StandardHeader from '../../components/common/StandardHeader';

import {
  ButtonContainer,
  ScannerContainer,
  TitleContainer,
  // VoucherCounter,
  BodyContainer,
  VoucherCountContainer,
} from './styles';
import {
  AddManuallyButton,
  ButtonMagenta,
  ButtonWhite,
  SafeArea,
} from '../../../assets/Components';
import Colors from '../../../assets/Colors';
import { ScannerStackScreenProps } from '../../navigation/types';
// import VoucherModal from '../../components/VoucherModal/VoucherModal';
import { useScanningContext } from './ScanningContext';
import { getMaxVoucherValue } from '../../database/queries';
import { handlePreventLeave } from '../../utils/scanningUtils';

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
  const { voucherMap, dispatch } = useScanningContext();
  const hasUnsavedChanges = Boolean(voucherMap.size);

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
      setScanned(true);

      const result = await getMaxVoucherValue(Number(data));
      const { ok } = result;
      // `ok` is true indicates valid serial number input
      if (ok) {
        // provides the maxVoucherValue to the confirm value screen to autofill the text box
        const { maxVoucherValue } = result;
        navigation.navigate('ConfirmValueScreen', {
          serialNumber: Number(data),
          maxVoucherValue,
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
    <SafeArea>
      {/* <VoucherModal modalVisible setModalVisible={undefined} /> */}
      <StandardHeader>
        {/* <TouchableOpacity onPress={() => navigation.navigate('ReviewScreen')}>
          <VoucherCounter>
            <CounterText>{voucherMap.size}</CounterText>
          </VoucherCounter>
        </TouchableOpacity> */}

        <AddManuallyButton
          onPress={() => navigation.navigate('ManualVoucherScreen')}
        >
          <ButtonTextBlack>
            <Icon name="pluscircleo" size={14} color={Colors.midBlack} />
            {'  '}
            Add Manually
          </ButtonTextBlack>
        </AddManuallyButton>

        <TouchableOpacity
          onPress={() =>
            handlePreventLeave({
              hasUnsavedChanges,
              navigation,
              dispatch,
            })
          }
        >
          <Icon name="close" size={24} color={Colors.midBlack} />
        </TouchableOpacity>
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
        <ButtonMagenta disabled={!scanned} onPress={() => setScanned(false)}>
          <ButtonTextWhite>Scan</ButtonTextWhite>
        </ButtonMagenta>

        <ButtonWhite
          onPress={() => navigation.navigate('ReviewScreen')}
          disabled={voucherMap.size === 0}
        >
          <ButtonTextMagenta>Review & Submit</ButtonTextMagenta>
        </ButtonWhite>
        <VoucherCountContainer>
          <Body1Text>Voucher Count: {voucherMap.size}</Body1Text>
        </VoucherCountContainer>
      </ButtonContainer>
      <Toast />
    </SafeArea>
  );
}
