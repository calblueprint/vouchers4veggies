import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { ButtonMagenta, ButtonWhite } from '../../../assets/Components';
import {
  ButtonTextWhite,
  ButtonTextBlack,
  H4CardNavTab,
  InputTitleText,
  Body2Subtext,
  Body1Text,
} from '../../../assets/Fonts';
import {
  BodyContainer,
  FormContainer,
  ErrorContainer,
  RedText,
  VoucherCountContainer,
} from './styles';
import { ScannerStackScreenProps } from '../../navigation/types';
import Colors from '../../../assets/Colors';
import { useScanningContext } from './ScanningContext';
import { getMaxVoucherValue } from '../../database/queries';

export default function ManualVoucherScreen({
  navigation,
}: ScannerStackScreenProps<'ManualVoucherScreen'>) {
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [showInvalidError, setShowInvalidError] = useState(false);
  const [showDuplicateError, setShowDuplicateError] = useState(false);

  const { voucherMap } = useScanningContext();
  const otpInput = useRef<TextInput>(null);

  const clearText = () => {
    otpInput.current?.clear();
  };

  const onChangeSerialNumber = (text: string) => {
    setShowInvalidError(false);
    setShowDuplicateError(false);
    const value = text.replace(/\D/g, '');
    setSerialNumber(value);
  };

  const handleVoucherAdd = async () => {
    if (voucherMap.has(Number(serialNumber))) {
      setShowDuplicateError(true);
    } else {
      const result = await getMaxVoucherValue(Number(serialNumber));
      const { ok } = result;
      // `ok` is true indicates valid serial number input
      if (ok) {
        setSerialNumber('');
        setShowInvalidError(false);
        setShowDuplicateError(false);
        // provides the maxVoucherValue to the confirm value screen to autofill the text box
        const { maxVoucherValue } = result;
        navigation.navigate('ConfirmValueScreen', {
          serialNumber: Number(serialNumber),
          maxVoucherValue,
        });
        // timeout to ensure that serial input is cleared after navigation
        setTimeout(() => {
          clearText();
        }, 50);
      } else {
        setShowInvalidError(true);
      }
    }
  };

  return (
    <BodyContainer>
      <FormContainer>
        <InputTitleText>Serial Number</InputTitleText>
        <OTPTextInput
          ref={otpInput}
          inputCount={7}
          tintColor={Colors.magenta}
          defaultValue={serialNumber}
          inputCellLength={1}
          handleTextChange={onChangeSerialNumber}
          containerStyle={{ marginVertical: 10 }}
          textInputStyle={{
            borderWidth: 1,
            borderRadius: 2,
            width: 30,
            height: 45,
          }}
          isValid={!showInvalidError}
          keyboardType="number-pad"
          returnKeyType="done"
          autoFocus={false}
        />
        <ErrorContainer>
          {showInvalidError ? (
            <RedText>
              <Body2Subtext>Oh no! Invalid serial number.</Body2Subtext>
            </RedText>
          ) : null}
          {showDuplicateError ? (
            <RedText>
              <Body2Subtext>
                You&apos;ve already added this serial number!
              </Body2Subtext>
            </RedText>
          ) : null}
        </ErrorContainer>
      </FormContainer>

      <ButtonMagenta disabled={showInvalidError} onPress={handleVoucherAdd}>
        <ButtonTextWhite>Add Voucher</ButtonTextWhite>
      </ButtonMagenta>
      <ButtonWhite
        onPress={() => navigation.navigate('ReviewScreen')}
        disabled={voucherMap.size === 0}
      >
        <ButtonTextBlack>
          <H4CardNavTab>Review and Submit</H4CardNavTab>
        </ButtonTextBlack>
      </ButtonWhite>
      <VoucherCountContainer>
        <Body1Text>Voucher Count: {voucherMap.size}</Body1Text>
      </VoucherCountContainer>
    </BodyContainer>
  );
}
