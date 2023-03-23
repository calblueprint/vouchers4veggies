import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import CurrencyInput from 'react-native-currency-input';
import { TextInput } from 'react-native';
import { ButtonMagenta } from '../../../assets/Components';
import Colors from '../../../assets/Colors';
import Styles from '../../components/InputField/styles';
import {
  ButtonTextWhite,
  CenterText,
  H2Heading,
  InputTitleText,
  CounterText,
} from '../../../assets/Fonts';
import {
  TitleContainer,
  Header,
  BodyContainer,
  SafeArea,
  FieldContainer,
  FormContainer,
  VoucherCounter,
} from './styles';
import StandardLogo from '../../components/common/StandardLogo';
import { ScannerStackScreenProps } from '../../navigation/types';
import { useScanningContext } from './ScanningContext';
import { addVoucher } from '../../utils/scanningUtils';

export default function ConfirmValueScreen({
  route,
  navigation,
}: ScannerStackScreenProps<'ConfirmValueScreen'>) {
  const { serialNumber } = route.params;
  const [voucherAmount, setVoucherAmount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { scanCounter, dispatch } = useScanningContext();

  const onChangeVoucherAmount = (value: number) => {
    setVoucherAmount(value ?? 0.0);
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      topOffset: 50,
      text1: 'Voucher Scanned!',
      visibilityTime: 2000,
    });
  };

  const handleVoucherAdd = () => {
    addVoucher(dispatch, serialNumber, voucherAmount);
    showToast();
    // clears input field if successfully added
    setVoucherAmount(0);
    navigation.navigate('ManualVoucherScreen');
  };

  return (
    <SafeArea>
      <Header>
        {scanCounter === 0 ? (
          <StandardLogo />
        ) : (
          <VoucherCounter>
            <CounterText>{scanCounter}</CounterText>
          </VoucherCounter>
        )}
      </Header>

      <BodyContainer>
        <TitleContainer>
          <CenterText>
            <H2Heading>Confirm Value</H2Heading>
          </CenterText>
        </TitleContainer>
        <FormContainer>
          <FieldContainer>
            <InputTitleText>Voucher Value</InputTitleText>
            <CurrencyInput // TODO: refactor currency input with custom text input base components
              value={voucherAmount}
              onChangeValue={onChangeVoucherAmount}
              renderTextInput={props => (
                <TextInput
                  {...props}
                  onBlur={() => setIsActive(false)}
                  onFocus={() => setIsActive(true)}
                  style={isActive ? Styles.FormFieldFocus : Styles.FormField}
                  placeholderTextColor={Colors.midGray}
                  secureTextEntry={false}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  returnKeyType="done"
                />
              )}
              prefix="$"
              minValue={0}
              maxValue={10}
              separator="."
              precision={2}
            />
          </FieldContainer>
        </FormContainer>
        <ButtonMagenta onPress={handleVoucherAdd}>
          <ButtonTextWhite>Confirm Value</ButtonTextWhite>
        </ButtonMagenta>
      </BodyContainer>
      <Toast />
    </SafeArea>
  );
}
