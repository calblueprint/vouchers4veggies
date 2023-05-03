import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { VoucherCreateError } from '../../types/types';
import { ButtonMagenta, ButtonWhite } from '../../../assets/Components';
import {
  ButtonTextWhite,
  ButtonTextBlack,
  H4CardNavTab,
  Body1TextSemibold,
  Body2Subtext,
  Body1Text,
  RedText,
} from '../../../assets/Fonts';
import { BodyContainer, ErrorContainer } from './styles';
import { ScannerStackScreenProps } from '../../navigation/types';
import Colors from '../../../assets/Colors';
import { useScanningContext } from './ScanningContext';
import { validateSerialNumber } from '../../database/queries';

export default function ManualVoucherScreen({
  navigation,
}: ScannerStackScreenProps<'ManualVoucherScreen'>) {
  const [serialNumberInput, setSerialNumberInput] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { voucherMap } = useScanningContext();
  const otpInput = useRef<TextInput>(null);

  const clearText = () => {
    otpInput.current?.clear();
  };

  const onChangeSerialNumber = (text: string) => {
    setShowError(false);
    const value = text.replace(/\D/g, '');
    setSerialNumberInput(value);
  };

  const handleVoucherAdd = async () => {
    const serialNumber = Number(serialNumberInput);
    // checks for duplicates within the current invoice draft
    if (voucherMap.has(serialNumber)) {
      setErrorMessage("You've already added this serial number!");
      setShowError(true);
    } else {
      const result = await validateSerialNumber(serialNumber);
      const { ok } = result;
      // `ok` is true indicates valid serial number input
      if (ok) {
        setSerialNumberInput('');
        setShowError(false);
        // provides the maxVoucherValue to the confirm value screen to autofill the text box
        const { maxValue, type } = result.voucherRange;
        navigation.navigate('ConfirmValueScreen', {
          serialNumber,
          maxValue,
          type,
        });
        // timeout to ensure that serial input is cleared after navigation
        setTimeout(() => {
          clearText();
        }, 50);
      } else {
        const { error } = result;
        if (error === VoucherCreateError.SerialNumberAlreadyUsed) {
          setErrorMessage('This serial number has already been processed.');
        } else {
          setErrorMessage('Oh no! Invalid serial number.');
        }
        setShowError(true);
      }
    }
  };

  return (
    <BodyContainer>
      <Body1TextSemibold>Serial Number</Body1TextSemibold>
      <OTPTextInput
        ref={otpInput}
        inputCount={7}
        tintColor={Colors.magenta}
        defaultValue={serialNumberInput}
        inputCellLength={1}
        handleTextChange={onChangeSerialNumber}
        containerStyle={{ marginVertical: 3 }}
        textInputStyle={{
          borderWidth: 1,
          borderRadius: 2,
          width: 30,
          height: '95%',
        }}
        isValid={!showError}
        keyboardType="number-pad"
        returnKeyType="done"
        autoFocus={false}
      />
      <ErrorContainer>
        {showError ? (
          <RedText>
            <Body2Subtext>{errorMessage}</Body2Subtext>
          </RedText>
        ) : null}
      </ErrorContainer>

      <ButtonMagenta disabled={showError} onPress={handleVoucherAdd}>
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
      <Body1Text>Voucher Count: {voucherMap.size}</Body1Text>
    </BodyContainer>
  );
}
