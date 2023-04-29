import React, { useState } from 'react';
import CurrencyInput from 'react-native-currency-input';
import { Keyboard, TextInput } from 'react-native';
import { ButtonMagenta, SafeArea } from '../../../assets/Components';
import Colors from '../../../assets/Colors';
import Styles from '../../components/InputField/styles';
import { VoucherValueError, VoucherValueResult } from '../../types/types';
import {
  ButtonTextWhite,
  CenterText,
  H2Heading,
  InputTitleText,
  Body2Subtext,
  // CounterText,
} from '../../../assets/Fonts';
import StandardHeader from '../../components/common/StandardHeader';

import {
  TitleContainer,
  BodyContainer,
  FormContainer,
  ErrorContainer,
  RedText,
  // VoucherCounter,
} from './styles';
import { ScannerStackScreenProps } from '../../navigation/types';
import { useScanningContext } from './ScanningContext';
import { addVoucher, showSuccessToast } from '../../utils/scanningUtils';
import BackButton from '../../components/common/BackButton';

export default function ConfirmValueScreen({
  route,
  navigation,
}: ScannerStackScreenProps<'ConfirmValueScreen'>) {
  const { serialNumber, maxValue, type } = route.params;
  const [voucherAmount, setVoucherAmount] = useState<number>(maxValue / 100);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showZeroError, setShowZeroError] = useState(false);
  const [showExceedError, setShowExceedError] = useState(false);
  const { dispatch } = useScanningContext();

  const onChangeVoucherAmount = (value: number) => {
    setShowZeroError(false);
    setShowExceedError(false);
    setVoucherAmount(value ?? 0.0);
  };

  const handleVoucherAddError = (centAmount: number): VoucherValueResult => {
    if (voucherAmount === 0) {
      return { ok: false, error: VoucherValueError.ZeroValue };
    }

    if (centAmount > maxValue) {
      return { ok: false, error: VoucherValueError.ExceedMax };
    }

    return { ok: true, error: null };
  };

  const handleVoucherAdd = () => {
    const centAmount = voucherAmount * 100;
    // ensures that voucher amount falls between constraints
    const result = handleVoucherAddError(centAmount);
    const { ok, error } = result;
    if (error === VoucherValueError.ZeroValue) {
      setShowZeroError(true);
    }

    if (error === VoucherValueError.ExceedMax) {
      setShowExceedError(true);
    }

    if (ok) {
      addVoucher(dispatch, serialNumber, centAmount, type);
      showSuccessToast();
      // clears input field if successfully added
      setVoucherAmount(0);
      Keyboard.dismiss();
      navigation.goBack();
    }
  };

  return (
    <SafeArea>
      <StandardHeader>
        {/* <TouchableOpacity onPress={() => navigation.navigate('ReviewScreen')}>
          <VoucherCounter>
            <CounterText>{voucherMap.size}</CounterText>
          </VoucherCounter>
        </TouchableOpacity> */}
        <BackButton onPress={() => navigation.goBack()} />
      </StandardHeader>

      <BodyContainer>
        <TitleContainer>
          <CenterText>
            <H2Heading>Confirm Value</H2Heading>
          </CenterText>
        </TitleContainer>
        <FormContainer>
          <InputTitleText>Voucher Value</InputTitleText>
          <CurrencyInput // TODO: refactor currency input & validation with custom text input base components
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
                selection={{
                  start: String(props.value).length,
                  end: String(props.value).length,
                }}
                caretHidden
              />
            )}
            prefix="$"
            minValue={0}
            separator="."
            delimiter=","
            precision={2}
          />
          <ErrorContainer>
            {showZeroError ? (
              <RedText>
                <Body2Subtext>
                  Voucher must be redeemed for more than $0.
                </Body2Subtext>
              </RedText>
            ) : null}
            {showExceedError ? (
              <RedText>
                <Body2Subtext>
                  Voucher value exceeds maximum redemption limit.
                </Body2Subtext>
              </RedText>
            ) : null}
          </ErrorContainer>
        </FormContainer>
        <ButtonMagenta onPress={handleVoucherAdd}>
          <ButtonTextWhite>Confirm Value</ButtonTextWhite>
        </ButtonMagenta>
      </BodyContainer>
    </SafeArea>
  );
}
