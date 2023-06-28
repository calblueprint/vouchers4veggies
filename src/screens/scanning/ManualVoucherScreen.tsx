import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { VoucherCreateError } from '../../types/types';
import { ButtonMagenta, ButtonWhite } from '../../../assets/Components';
import { BodyContainer, ErrorContainer, styles } from './styles';
import { VoucherEntryNavigationProps } from '../../navigation/types';
import Colors from '../../../assets/Colors';
import { useScanningContext } from './ScanningContext';
import { validateSerialNumber } from '../../database/queries';
import {
  ButtonTextWhite,
  ButtonTextBlack,
  H4CardNavTab,
  Body1TextSemibold,
  Body2Subtext,
  Body1Text,
  RedText,
} from '../../../assets/Fonts';

type ManualVoucherScreenProps = {
  navigation: VoucherEntryNavigationProps;
};

export default function ManualVoucherScreen({
  navigation,
}: ManualVoucherScreenProps) {
  const [serialNumberInput, setSerialNumberInput] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { voucherMap } = useScanningContext();
  const otpInput = useRef<TextInput>(null);

  const clearText = () => {
    otpInput.current?.clear();
  };

  const onChangeSerialNumber = (text: string) => {
    setShowErrorMessage(false);
    const value = text.replace(/\D/g, '');
    setSerialNumberInput(value);
  };

  const handleVoucherAdd = async () => {
    const serialNumber = Number(serialNumberInput);
    // checks for duplicates within the current invoice draft
    if (voucherMap.has(serialNumber)) {
      setErrorMessage("You've already added this serial number!");
      setShowErrorMessage(true);
    } else {
      const result = await validateSerialNumber(serialNumber);
      const { ok } = result;
      // `ok` is true indicates valid serial number input
      if (ok) {
        setSerialNumberInput('');
        setShowErrorMessage(false);
        // provides the maxVoucherValue to the confirm value screen to autofill the text box
        const { maxValue, type } = result.voucherType;
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
        setShowErrorMessage(true);
      }
    }
  };

  const navigateToReview = () => navigation.navigate('ReviewScreen');

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
        containerStyle={styles.otpContainerStyle}
        textInputStyle={styles.otpTextInputStyle}
        isValid={!showErrorMessage}
        keyboardType="number-pad"
        returnKeyType="done"
        autoFocus={false}
      />
      <ErrorContainer>
        <Body2Subtext>
          {showErrorMessage && <RedText>{errorMessage}</RedText>}
        </Body2Subtext>
      </ErrorContainer>

      <ButtonMagenta disabled={showErrorMessage} onPress={handleVoucherAdd}>
        <ButtonTextWhite>Add Voucher</ButtonTextWhite>
      </ButtonMagenta>
      <ButtonWhite onPress={navigateToReview} disabled={voucherMap.size === 0}>
        <ButtonTextBlack>
          <H4CardNavTab>Review and Submit</H4CardNavTab>
        </ButtonTextBlack>
      </ButtonWhite>
      <Body1Text>Voucher Count: {voucherMap.size}</Body1Text>
    </BodyContainer>
  );
}
