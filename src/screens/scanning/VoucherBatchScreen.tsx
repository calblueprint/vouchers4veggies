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
    // validates the starting serial number
    const startSerialNumber = Number(startSerialNumberInput);
    if (voucherMap.has(startSerialNumber)) {
      setShowStartDuplicateError(true);
      return;
    }
    const startResult = await getMaxVoucherValue(Number(startSerialNumber));
    if (!startResult.ok) {
      setShowStartInvalidError(true);
      return;
    }
    // validates the starting serial number
    const endSerialNumber = Number(endSerialNumberInput);
    if (voucherMap.has(endSerialNumber)) {
      setShowEndDuplicateError(true);
      return;
    }
    const endResult = await getMaxVoucherValue(Number(endSerialNumber));
    if (!endResult.ok) {
      setShowEndInvalidError(true);
      return;
    }

    const validSerialNumbers = await validateMultipleVouchers(
      startSerialNumber,
      endSerialNumber,
    );

    // eslint-disable-next-line no-console
    console.log(validSerialNumbers);

    const rangeLength = endSerialNumber - startSerialNumber + 1;
    if (validSerialNumbers.length === rangeLength) {
      multipleVoucherSuccessToast();
    } else {
      partialSuccessVoucherToast(validSerialNumbers.length, rangeLength);
    }

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
        <ButtonWhite
          // onPress={() => navigation.navigate('ReviewScreen')}
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
