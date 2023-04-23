import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  ButtonMagenta,
  ButtonWhite,
  AddManuallyButton,
  SafeArea,
} from '../../../assets/Components';
import {
  ButtonTextWhite,
  ButtonTextBlack,
  H4CardNavTab,
  CenterText,
  H2Heading,
  InputTitleText,
  // CounterText,
  Body2Subtext,
  Body1Text,
  LoadingText,
} from '../../../assets/Fonts';
import {
  TitleContainer,
  BodyContainer,
  RangeInputContainer,
  FormContainer,
  // VoucherCounter,
  ErrorContainer,
  RedText,
  VoucherRangeContainer,
  VoucherCountContainer,
  LoadingContainer,
} from './styles';
import InputField from '../../components/InputField/InputField';
import StandardHeader from '../../components/common/StandardHeader';
import { ScannerStackScreenProps } from '../../navigation/types';
import Colors from '../../../assets/Colors';
import { useScanningContext } from './ScanningContext';
import {
  getMaxVoucherValue,
  validateMultipleVouchers,
} from '../../database/queries';
import {
  addMultipleVouchers,
  handlePreventLeave,
  multipleVoucherSuccessToast,
  partialSuccessVoucherToast,
} from '../../utils/scanningUtils';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function VoucherBatchScreen({
  navigation,
}: ScannerStackScreenProps<'VoucherBatchScreen'>) {
  const [isProcessing, setProcessingVouchers] = useState(false);

  const [startSerialNumberInput, setStartSerialNumber] = useState<string>('');
  const [showStartInvalidError, setShowStartInvalidError] = useState(false);

  const [endSerialNumberInput, setEndSerialNumber] = useState<string>('');
  const [showEndInvalidError, setShowEndInvalidError] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { voucherMap, dispatch } = useScanningContext();
  const hasUnsavedChanges = Boolean(voucherMap.size);

  const onChangeStartSerialNumber = (text: string) => {
    setShowStartInvalidError(false);
    const value = text.replace(/\D/g, '');
    setStartSerialNumber(value);
  };

  const onChangeEndSerialNumber = (text: string) => {
    setShowEndInvalidError(false);
    const value = text.replace(/\D/g, '');
    setEndSerialNumber(value);
  };

  const handleVoucherAdd = async () => {
    // prevents user from adding vouchers while processing and displays loading spinner
    setProcessingVouchers(true);

    // cast input values to Numbers
    const startSerialNumber = Number(startSerialNumberInput);
    const endSerialNumber = Number(endSerialNumberInput);

    // checks if either input is a duplicate (within the current invoice) and returns 1-2 errors if so
    const isStartDuplicate = voucherMap.has(startSerialNumber);
    const isEndDuplicate = voucherMap.has(endSerialNumber);
    if (isStartDuplicate && isEndDuplicate) {
      setProcessingVouchers(false);
      setShowStartInvalidError(true);
      setShowEndInvalidError(true);
      setErrorMessage("You've already added these serial numbers!");
      return;
    }
    if (isStartDuplicate) {
      setProcessingVouchers(false);
      setShowStartInvalidError(true);
      setErrorMessage("You've already added the starting serial number!");
      return;
    }
    if (isEndDuplicate) {
      setProcessingVouchers(false);
      setShowEndInvalidError(true);
      setErrorMessage("You've already added the ending serial number!");
      return;
    }

    // validates both the start and end serial numbers individually
    const startResult = await getMaxVoucherValue(startSerialNumber);
    const endResult = await getMaxVoucherValue(endSerialNumber);
    if (!startResult.ok && !endResult.ok) {
      setProcessingVouchers(false);
      setShowStartInvalidError(true);
      setShowEndInvalidError(true);
      setErrorMessage('Both serial numbers are invalid!');
      return;
    }
    if (!startResult.ok) {
      setProcessingVouchers(false);
      setShowStartInvalidError(true);
      setErrorMessage('Start serial number is invalid!');
      return;
    }
    if (!endResult.ok || startSerialNumber >= endSerialNumber) {
      setProcessingVouchers(false);
      setShowEndInvalidError(true);
      setErrorMessage('End serial number is invalid!');
      return;
    }

    // validates the entire range of serialNumbers
    const validSerialNumbers = await validateMultipleVouchers(
      startSerialNumber,
      endSerialNumber,
    );

    setProcessingVouchers(false);

    // if fewer serialNumbers are returned than expected, show a specific error
    const rangeLength = endSerialNumber - startSerialNumber + 1;
    if (validSerialNumbers.length === rangeLength) {
      multipleVoucherSuccessToast();
    } else {
      partialSuccessVoucherToast(validSerialNumbers.length, rangeLength);
    }

    // dispatch multiple vouchers to the scanning context
    addMultipleVouchers(
      dispatch,
      validSerialNumbers,
      startResult.maxVoucherValue,
    );

    // clears input field if successfully added
    setStartSerialNumber('');
    setEndSerialNumber('');
    setShowStartInvalidError(false);
    setShowEndInvalidError(false);
    setErrorMessage('');
  };

  return (
    <SafeArea>
      <StandardHeader>
        <AddManuallyButton
          onPress={() => navigation.navigate('ScanningScreen')}
        >
          <ButtonTextBlack>
            <Icon name="scan1" size={14} color={Colors.midBlack} />
            {'  '}
            Scan Voucher
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

      <TitleContainer>
        <CenterText>
          <H2Heading>Add a voucher</H2Heading>
        </CenterText>
      </TitleContainer>

      {isProcessing ? (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Processing Voucher Range</LoadingText>
        </LoadingContainer>
      ) : (
        <BodyContainer>
          <FormContainer>
            <VoucherRangeContainer>
              <RangeInputContainer>
                <InputTitleText>From</InputTitleText>
                <InputField
                  onChange={onChangeStartSerialNumber}
                  value={startSerialNumberInput}
                  placeholder="Enter Number"
                  isValid={!showStartInvalidError}
                  keyboardType="number-pad"
                />
              </RangeInputContainer>
              <RangeInputContainer>
                <InputTitleText>To</InputTitleText>
                <InputField
                  onChange={onChangeEndSerialNumber}
                  value={endSerialNumberInput}
                  placeholder="Enter Number"
                  isValid={!showEndInvalidError}
                  keyboardType="number-pad"
                />
              </RangeInputContainer>
            </VoucherRangeContainer>
            <ErrorContainer>
              {showStartInvalidError || showEndInvalidError ? (
                <RedText>
                  <Body2Subtext>{errorMessage}</Body2Subtext>
                </RedText>
              ) : null}
            </ErrorContainer>
          </FormContainer>

          <ButtonMagenta
            disabled={showStartInvalidError || showEndInvalidError}
            onPress={handleVoucherAdd}
          >
            <ButtonTextWhite>Add Voucher Range</ButtonTextWhite>
          </ButtonMagenta>
          {/* <ButtonMagenta
            onPress={() => navigation.navigate('ManualVoucherScreen')}
          >
            <ButtonTextWhite>Add Singular Vouchers</ButtonTextWhite>
          </ButtonMagenta> */}
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
      )}
      <Toast />
    </SafeArea>
  );
}
