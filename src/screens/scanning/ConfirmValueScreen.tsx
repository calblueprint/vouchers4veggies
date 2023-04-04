import React, { useState } from 'react';
import CurrencyInput from 'react-native-currency-input';
import { Keyboard, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { ButtonMagenta, SafeArea } from '../../../assets/Components';
import Colors from '../../../assets/Colors';
import Styles from '../../components/InputField/styles';
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
  FieldContainer,
  FormContainer,
  ErrorContainer,
  RedText,
  // VoucherCounter,
} from './styles';
import { ScannerStackScreenProps } from '../../navigation/types';
import { useScanningContext } from './ScanningContext';
import { voucherAmountIsValid } from '../../database/queries';
import {
  addVoucher,
  handlePreventLeave,
  showSuccessToast,
} from '../../utils/scanningUtils';

export default function ConfirmValueScreen({
  route,
  navigation,
}: ScannerStackScreenProps<'ConfirmValueScreen'>) {
  const { serialNumber } = route.params;
  const [voucherAmount, setVoucherAmount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);
  const { voucherMap, dispatch } = useScanningContext();
  const hasUnsavedChanges = Boolean(voucherMap.size);

  const onChangeVoucherAmount = (value: number) => {
    setVoucherAmount(value ?? 0.0);
  };

  const handleVoucherAdd = async () => {
    const centAmount = voucherAmount * 100;
    const isValid = await voucherAmountIsValid(serialNumber, centAmount);

    if (isValid) {
      addVoucher(dispatch, serialNumber, centAmount);
      showSuccessToast();
      // clears input field if successfully added
      setVoucherAmount(0);
      Keyboard.dismiss();
      navigation.goBack();
    } else {
      setShowError(true);
    }

  return (
    <SafeArea>
      <StandardHeader>
        {/* <TouchableOpacity onPress={() => navigation.navigate('ReviewScreen')}>
          <VoucherCounter>
            <CounterText>{voucherMap.size}</CounterText>
          </VoucherCounter>
        </TouchableOpacity> */}
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
            <H2Heading>Confirm Value</H2Heading>
          </CenterText>
        </TitleContainer>
        <FormContainer>
          <FieldContainer>
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
          </FieldContainer>
          <ErrorContainer>
            {showError ? (
              <RedText>
                <Body2Subtext>Oh no! Invalid Voucher Amount.</Body2Subtext>
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
