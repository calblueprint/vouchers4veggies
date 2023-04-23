import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import OTPTextInput from 'react-native-otp-textinput';
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
} from '../../../assets/Fonts';
import {
  TitleContainer,
  BodyContainer,
  FormContainer,
  // VoucherCounter,
  ErrorContainer,
  RedText,
  VoucherCountContainer,
} from './styles';
import StandardHeader from '../../components/common/StandardHeader';
import { ScannerStackScreenProps } from '../../navigation/types';
import Colors from '../../../assets/Colors';
import { useScanningContext } from './ScanningContext';
import { getMaxVoucherValue } from '../../database/queries';
import { handlePreventLeave } from '../../utils/scanningUtils';

export default function ManualVoucherScreen({
  navigation,
}: ScannerStackScreenProps<'ManualVoucherScreen'>) {
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [showInvalidError, setShowInvalidError] = useState(false);
  const [showDuplicateError, setShowDuplicateError] = useState(false);

  const { voucherMap, dispatch } = useScanningContext();
  const hasUnsavedChanges = Boolean(voucherMap.size);
  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.clear();
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
        // clears input field if successfully added
        // clearing works but it clears the screen before
        // navigating to Confirm screen which is wrong.
        // if clear text goes after navigation call, text does not clear
        clearText();
        setSerialNumber('');
        setShowInvalidError(false);
        setShowDuplicateError(false);
        // provides the maxVoucherValue to the confirm value screen to autofill the text box
        const { maxVoucherValue } = result;
        navigation.navigate('ConfirmValueScreen', {
          serialNumber: Number(serialNumber),
          maxVoucherValue,
        });
      } else {
        setShowInvalidError(true);
      }
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
            <H2Heading>Add a voucher</H2Heading>
          </CenterText>
        </TitleContainer>
        <FormContainer>
          <InputTitleText>Serial Number</InputTitleText>
          <OTPTextInput
            ref={(e: React.MutableRefObject<null>) => {
              otpInput = e;
            }}
            inputCount={7}
            tintColor={Colors.magenta}
            defaultValue={serialNumber}
            inputCellLength={1}
            handleTextChange={onChangeSerialNumber}
            containerStyle={{ marginTop: 10 }}
            textInputStyle={{
              borderWidth: 1,
              borderRadius: 2,
              width: 30,
            }}
            isValid={!showInvalidError}
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
        <ButtonMagenta
          onPress={() => navigation.navigate('VoucherBatchScreen')}
        >
          <ButtonTextWhite>Add Multiple Vouchers</ButtonTextWhite>
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

      <Toast />
    </SafeArea>
  );
}
