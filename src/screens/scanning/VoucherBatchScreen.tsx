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
import { serialNumberIsValid } from '../../database/queries';
import { handlePreventLeave } from '../../utils/scanningUtils';

export default function VoucherBatchScreen({
  navigation,
}: ScannerStackScreenProps<'VoucherBatchScreen'>) {
  const [startSerialNumber, setStartSerialNumber] = useState<string>('');
  const [showStartInvalidError, setShowStartInvalidError] = useState(false);
  const [showStartDuplicateError, setShowStartDuplicateError] = useState(false);

  const [endSerialNumber, setEndSerialNumber] = useState<string>('');
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
    if (voucherMap.has(Number(startSerialNumber))) {
      setShowStartDuplicateError(true);
      return;
    }
    if (voucherMap.has(Number(endSerialNumber))) {
      setShowEndDuplicateError(true);
      return;
    }
    const isStartValid = await serialNumberIsValid(Number(startSerialNumber));
    if (!isStartValid) {
      setShowStartInvalidError(true);
      return;
    }
    const isEndValid = await serialNumberIsValid(Number(endSerialNumber));
    if (!isEndValid) {
      setShowEndInvalidError(true);
      return;
    }

    // clears input field if successfully added
    setStartSerialNumber('');
    setShowStartInvalidError(false);
    setShowStartDuplicateError(false);

    setEndSerialNumber('');
    setShowEndInvalidError(false);
    setShowEndDuplicateError(false);

    // navigation.navigate('ConfirmValueScreen', {
    //   serialNumber: serialNumberInput,
    // });
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
              value={startSerialNumber}
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
              value={endSerialNumber}
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
