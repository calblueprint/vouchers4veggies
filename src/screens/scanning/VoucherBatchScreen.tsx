import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { ButtonMagenta, ButtonWhite } from '../../../assets/Components';
import {
  ButtonTextWhite,
  ButtonTextBlack,
  H4CardNavTab,
  Body1SemiboldText,
  Body2Subtext,
  Body1Text,
  LoadingText,
  RedText,
} from '../../../assets/Fonts';
import {
  BodyContainer,
  ErrorContainer,
  VoucherRangeContainer,
  LoadingContainer,
  styles,
} from './styles';
import { ScannerStackScreenProps } from '../../navigation/types';
import { useScanningContext } from './ScanningContext';
import {
  validateSerialNumber,
  validateEntireVoucherRange,
} from '../../database/queries';
import {
  addMultipleVouchers,
  multipleVoucherSuccessToast,
  partialSuccessVoucherToast,
} from '../../utils/scanningUtils';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Colors from '../../../assets/Colors';

export default function VoucherBatchScreen({
  navigation,
}: ScannerStackScreenProps<'VoucherBatchScreen'>) {
  const [isProcessing, setProcessingVouchers] = useState(false);

  const [startSerialNumberInput, setStartSerialNumber] = useState<string>('');
  const [endSerialNumberInput, setEndSerialNumber] = useState<string>('');
  const [showInvalidError, setShowInvalidError] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { voucherMap, dispatch } = useScanningContext();
  const otpInput1 = useRef<TextInput>(null);
  const otpInput2 = useRef<TextInput>(null);

  const onSubmit = () => navigation.navigate('ReviewScreen');

  const clearText = () => {
    otpInput1.current?.clear();
    otpInput2.current?.clear();
  };

  const onChangeStartSerialNumber = (text: string) => {
    setShowInvalidError(false);
    setStartSerialNumber(text);
  };

  const onChangeEndSerialNumber = (text: string) => {
    setShowInvalidError(false);
    setEndSerialNumber(text);
  };

  const handleVoucherAdd = async () => {
    // prevents user from adding vouchers while processing and displays loading spinner
    setProcessingVouchers(true);

    // cast input values to Numbers
    const startSerialNumber = Number(startSerialNumberInput);
    const endSerialNumber = Number(endSerialNumberInput);

    // ensures there aren't more than 24 vouchers in voucher batch
    if (endSerialNumber - startSerialNumber >= 24) {
      setProcessingVouchers(false);
      setShowInvalidError(true);
      setErrorMessage('You may only add up to 24 vouchers at once!');
      return;
    }

    // checks if either input is a duplicate (within the current invoice) and returns 1-2 errors if so
    const isStartDuplicate = voucherMap.has(startSerialNumber);
    const isEndDuplicate = voucherMap.has(endSerialNumber);
    if (isStartDuplicate && isEndDuplicate) {
      setProcessingVouchers(false);
      setShowInvalidError(true);
      setErrorMessage("You've already added these serial numbers!");
      return;
    }
    if (isStartDuplicate) {
      setProcessingVouchers(false);
      setShowInvalidError(true);
      setErrorMessage("You've already added the starting serial number!");
      return;
    }
    if (isEndDuplicate) {
      setProcessingVouchers(false);
      setShowInvalidError(true);
      setErrorMessage("You've already added the ending serial number!");
      return;
    }

    // validates both the start and end serial numbers individually
    const startResult = await validateSerialNumber(startSerialNumber);
    const endResult = await validateSerialNumber(endSerialNumber);
    if (!startResult.ok && !endResult.ok) {
      setProcessingVouchers(false);
      setShowInvalidError(true);
      setErrorMessage('Both serial numbers are invalid!');
      return;
    }
    if (!startResult.ok) {
      setProcessingVouchers(false);
      setShowInvalidError(true);
      setErrorMessage('Start serial number is invalid!');
      return;
    }
    if (!endResult.ok || startSerialNumber >= endSerialNumber) {
      setProcessingVouchers(false);
      setShowInvalidError(true);
      setErrorMessage('End serial number is invalid!');
      return;
    }

    // validates the entire range of serialNumbers
    const validSerialNumbers = await validateEntireVoucherRange(
      startSerialNumber,
      endSerialNumber,
    );

    // dispatch multiple vouchers to the scanning context
    addMultipleVouchers(
      dispatch,
      validSerialNumbers,
      startResult.voucherRange.maxValue,
      startResult.voucherRange.type,
    );

    // if fewer serialNumbers are returned than expected, show a specific error
    const rangeLength = endSerialNumber - startSerialNumber + 1;
    if (validSerialNumbers.length === rangeLength) {
      multipleVoucherSuccessToast();
    } else {
      partialSuccessVoucherToast(validSerialNumbers.length, rangeLength);
    }

    // clears input field if successfully added
    // timeout to ensure that serial input is cleared after navigation
    setStartSerialNumber('');
    setEndSerialNumber('');
    setShowInvalidError(false);
    setErrorMessage('');
    setTimeout(() => {
      clearText();
    }, 50);

    setProcessingVouchers(false);
  };

  return (
    <BodyContainer>
      {isProcessing ? (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Processing Voucher Range</LoadingText>
        </LoadingContainer>
      ) : (
        <>
          <VoucherRangeContainer>
            <Body1SemiboldText>From</Body1SemiboldText>
            <OTPTextInput
              ref={otpInput1}
              inputCount={7}
              tintColor={Colors.magenta}
              defaultValue={startSerialNumberInput}
              inputCellLength={1}
              handleTextChange={onChangeStartSerialNumber}
              containerStyle={styles.otpContainerStyle}
              textInputStyle={styles.otpTextInputStyle}
              isValid={!showInvalidError}
              keyboardType="number-pad"
              returnKeyType="done"
              autoFocus={false}
            />
            <Body1SemiboldText> {'\n'} To</Body1SemiboldText>
            <OTPTextInput
              ref={otpInput2}
              inputCount={7}
              tintColor={Colors.magenta}
              defaultValue={endSerialNumberInput}
              inputCellLength={1}
              handleTextChange={onChangeEndSerialNumber}
              containerStyle={styles.otpContainerStyle}
              textInputStyle={styles.otpTextInputStyle}
              isValid={!showInvalidError}
              keyboardType="number-pad"
              returnKeyType="done"
              autoFocus={false}
            />
          </VoucherRangeContainer>
          <ErrorContainer>
            {showInvalidError ? (
              <RedText>
                <Body2Subtext>{errorMessage}</Body2Subtext>
              </RedText>
            ) : null}
          </ErrorContainer>

          <ButtonMagenta disabled={showInvalidError} onPress={handleVoucherAdd}>
            <ButtonTextWhite>Add Voucher Range</ButtonTextWhite>
          </ButtonMagenta>
          <ButtonWhite onPress={onSubmit} disabled={voucherMap.size === 0}>
            <ButtonTextBlack>
              <H4CardNavTab>Review and Submit</H4CardNavTab>
            </ButtonTextBlack>
          </ButtonWhite>
          <Body1Text>Voucher Count: {voucherMap.size}</Body1Text>
        </>
      )}
    </BodyContainer>
  );
}
