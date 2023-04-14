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
} from '../../../assets/Fonts';
import {
  TitleContainer,
  BodyContainer,
  FieldContainer,
  FormContainer,
  // VoucherCounter,
  ErrorContainer,
  RedText,
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

export default function VoucherBatchScreen({
  navigation,
}: ScannerStackScreenProps<'VoucherBatchScreen'>) {
  const [startSerialNumberInput, setStartSerialNumber] = useState<string>('');
  const [showStartInvalidError, setShowStartInvalidError] = useState(false);
  const [showStartDuplicateError, setShowStartDuplicateError] = useState(false);

  const [endSerialNumberInput, setEndSerialNumber] = useState<string>('');
  const [showEndInvalidError, setShowEndInvalidError] = useState(false);
  const [showEndDuplicateError, setShowEndDuplicateError] = useState(false);

  const { voucherMap, dispatch } = useScanningContext();
  const hasUnsavedChanges = Boolean(voucherMap.size);

  const onChangeStartSerialNumber = (text: string) => {
    setShowStartInvalidError(false);
    setShowStartDuplicateError(false);
    const value = text.replace(/\D/g, '');
    setStartSerialNumber(value);
  };

  const onChangeEndSerialNumber = (text: string) => {
    setShowEndInvalidError(false);
    setShowEndDuplicateError(false);
    const value = text.replace(/\D/g, '');
    setEndSerialNumber(value);
  };

  const handleVoucherAdd = async () => {
    const startSerialNumber = Number(startSerialNumberInput);
    const endSerialNumber = Number(endSerialNumberInput);

    // checks if either input is a duplicate and returns 1-2 errors if so
    const isStartDuplicate = voucherMap.has(startSerialNumber);
    const isEndDuplicate = voucherMap.has(endSerialNumber);
    if (isStartDuplicate || isEndDuplicate) {
      if (isStartDuplicate) {
        setShowStartDuplicateError(true);
      }
      if (isEndDuplicate) {
        setShowEndDuplicateError(true);
      }
      return;
    }
    // validates that both inputs are valid serialNumbers
    const startResult = await getMaxVoucherValue(startSerialNumber);
    if (!startResult.ok) {
      setShowStartInvalidError(true);
      return;
    }
    const endResult = await getMaxVoucherValue(endSerialNumber);
    if (!endResult.ok || startSerialNumber >= endSerialNumber) {
      setShowEndInvalidError(true);
      return;
    }
    // validates the entire range of serialNumbers
    const validSerialNumbers = await validateMultipleVouchers(
      startSerialNumber,
      endSerialNumber,
    );
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
    setShowStartInvalidError(false);
    setShowStartDuplicateError(false);

    setEndSerialNumber('');
    setShowEndInvalidError(false);
    setShowEndDuplicateError(false);
  };

  return (
    <SafeArea>
      <StandardHeader>
        {/* <TouchableOpacity onPress={() => navigation.navigate('ReviewScreen')}>
          <VoucherCounter>
            <CounterText>{voucherMap.size}</CounterText>
          </VoucherCounter>
        </TouchableOpacity> */}

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

      <BodyContainer>
        <TitleContainer>
          <CenterText>
            <H2Heading>Add a range of vouchers</H2Heading>
          </CenterText>
        </TitleContainer>
        <FormContainer>
          <FieldContainer>
            <InputTitleText>Starting Serial Number</InputTitleText>
            <InputField
              onChange={onChangeStartSerialNumber}
              value={startSerialNumberInput}
              placeholder="Enter Number"
              isValid={!showStartInvalidError}
              keyboardType="number-pad"
            />
          </FieldContainer>
          <ErrorContainer>
            {showStartInvalidError ? (
              <RedText>
                <Body2Subtext>Oh no! Invalid serial number.</Body2Subtext>
              </RedText>
            ) : null}
            {showStartDuplicateError ? (
              <RedText>
                <Body2Subtext>
                  You&apos;ve already added this serial number!
                </Body2Subtext>
              </RedText>
            ) : null}
          </ErrorContainer>
          <FieldContainer>
            <InputTitleText>End Serial Number</InputTitleText>
            <InputField
              onChange={onChangeEndSerialNumber}
              value={endSerialNumberInput}
              placeholder="Enter Number"
              isValid={!showEndInvalidError}
              keyboardType="number-pad"
            />
          </FieldContainer>
          <ErrorContainer>
            {showEndInvalidError ? (
              <RedText>
                <Body2Subtext>Oh no! Invalid serial number.</Body2Subtext>
              </RedText>
            ) : null}
            {showEndDuplicateError ? (
              <RedText>
                <Body2Subtext>
                  You&apos;ve already added this serial number!
                </Body2Subtext>
              </RedText>
            ) : null}
          </ErrorContainer>
        </FormContainer>

        <ButtonMagenta
          disabled={showStartInvalidError || showEndInvalidError}
          onPress={handleVoucherAdd}
        >
          <ButtonTextWhite>Add Range of Vouchers</ButtonTextWhite>
        </ButtonMagenta>
        <ButtonMagenta
          onPress={() => navigation.navigate('ManualVoucherScreen')}
        >
          <ButtonTextWhite>Add Singular Vouchers</ButtonTextWhite>
        </ButtonMagenta>
        <ButtonWhite
          onPress={() => navigation.navigate('ReviewScreen')}
          disabled={voucherMap.size === 0}
        >
          <ButtonTextBlack>
            <H4CardNavTab>Review and Submit</H4CardNavTab>
          </ButtonTextBlack>
        </ButtonWhite>
      </BodyContainer>
      <Toast />
    </SafeArea>
  );
}
