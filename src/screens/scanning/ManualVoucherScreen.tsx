import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  ButtonMagenta,
  ButtonWhite,
  AddManuallyButton,
} from '../../../assets/Components';
import {
  ButtonTextWhite,
  ButtonTextBlack,
  H4CardNavTab,
  CenterText,
  H2Heading,
  InputTitleText,
  CounterText,
} from '../../../assets/Fonts';
import {
  TitleContainer,
  BodyContainer,
  SafeArea,
  FieldContainer,
  FormContainer,
  VoucherCounter,
} from './styles';
import InputField from '../../components/InputField/InputField';
import StandardLogo from '../../components/common/StandardLogo';
import StandardHeader from '../../components/common/StandardHeader';
import { validateSerialNumberInput } from '../../utils/validationUtils';
import { ScannerStackScreenProps } from '../../navigation/types';
import Colors from '../../../assets/Colors';
import { useScanningContext } from './ScanningContext';

export default function ManualVoucherScreen({
  navigation,
}: ScannerStackScreenProps<'ManualVoucherScreen'>) {
  const [serialNumber, setSerialNumber] = useState<string>('');
  const { scanCounter } = useScanningContext();

  const onChangeSerialNumber = (text: string) => {
    const value = text.replace(/\D/g, '');
    setSerialNumber(value);
  };

  const handleVoucherAdd = () => {
    const serialNumberInput = Number(serialNumber);
    // clears input field if successfully added
    setSerialNumber('');
    // TODO: change once we create custom base components for number inputs
    navigation.navigate('ConfirmValueScreen', {
      serialNumber: serialNumberInput,
    });
  };

  return (
    <SafeArea>
      <StandardHeader topMargin="4%">
        {scanCounter === 0 ? (
          <StandardLogo />
        ) : (
          <VoucherCounter>
            <CounterText>{scanCounter}</CounterText>
          </VoucherCounter>
        )}

        <AddManuallyButton
          onPress={() => navigation.navigate('ScanningScreen')}
        >
          <ButtonTextBlack>
            <Icon name="pluscircleo" size={14} color={Colors.midBlack} />
            {'  '}
            Scan Voucher
          </ButtonTextBlack>
        </AddManuallyButton>
      </StandardHeader>

      <BodyContainer>
        <TitleContainer>
          <CenterText>
            <H2Heading>Add a voucher</H2Heading>
          </CenterText>
        </TitleContainer>
        <FormContainer>
          <FieldContainer>
            <InputTitleText>Serial Number</InputTitleText>
            <InputField
              onChange={onChangeSerialNumber}
              value={serialNumber}
              placeholder="Enter Number"
              validate={validateSerialNumberInput}
              keyboardType="number-pad"
            />
          </FieldContainer>
        </FormContainer>
        <ButtonMagenta onPress={handleVoucherAdd}>
          <ButtonTextWhite>Add Voucher</ButtonTextWhite>
        </ButtonMagenta>
        <ButtonWhite disabled={scanCounter === 0}>
          <ButtonTextBlack>
            <H4CardNavTab>Review and Submit</H4CardNavTab>
          </ButtonTextBlack>
        </ButtonWhite>
      </BodyContainer>
    </SafeArea>
  );
}
