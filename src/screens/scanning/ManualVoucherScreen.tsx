import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  ButtonMagenta,
  ButtonWhite,
  AddManuallyButton,
} from '../../../assets/Components';
import {
  ButtonTextWhite,
  ButtonTextBlack,
  H4CardNavTab,
  CenterText,
  H2Heading,
  InputTitleText,
  CounterText,
  Body2Subtext,
} from '../../../assets/Fonts';
import {
  TitleContainer,
  Header,
  BodyContainer,
  SafeArea,
  FieldContainer,
  FormContainer,
  VoucherCounter,
  ErrorContainer,
  RedText,
} from './styles';
import InputField from '../../components/InputField/InputField';
import StandardLogo from '../../components/common/StandardLogo';
import { validateSerialNumberInput } from '../../utils/validationUtils';
import { ScannerStackScreenProps } from '../../navigation/types';
import Colors from '../../../assets/Colors';
import { useScanningContext } from './ScanningContext';

export default function ManualVoucherScreen({
  navigation,
}: ScannerStackScreenProps<'ManualVoucherScreen'>) {
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [scanCounter, setScanCounter] = useState<number>(0);
  const [showError, setShowError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { isEmpty, voucherMap } = useScanningContext();

  const onChangeSerialNumber = (text: string) => {
    setShowError(false);
    const value = text.replace(/\D/g, '');
    setSerialNumber(value);
  };

  const handleVoucherAdd = async () => {
    await validateSerialNumberInput(result => setIsValid(result), serialNumber);

    if (isValid) {
      const serialNumberInput = Number(serialNumber);
      // clears input field if successfully added
      setSerialNumber('');
      // TODO: change once we create custom base components for number inputs
      navigation.navigate('ConfirmValueScreen', {
        serialNumber: serialNumberInput,
      });
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(voucherMap);
    setScanCounter(voucherMap.size);
  }, [voucherMap]);

  return (
    <SafeArea>
      <Header>
        {scanCounter === 0 ? (
          <StandardLogo />
        ) : (
          <VoucherCounter>
            <CounterText>{scanCounter}</CounterText>
          </VoucherCounter>
        )}

        <AddManuallyButton
          onPress={() => navigation.navigate('ScanningScreen')}
        >
          <ButtonTextBlack>
            <Icon name="pluscircleo" size={14} color={Colors.midBlack} />
            {'  '}
            Scan Voucher
          </ButtonTextBlack>
        </AddManuallyButton>
      </Header>

      <BodyContainer>
        <TitleContainer>
          <CenterText>
            <H2Heading>Add a voucher</H2Heading>
          </CenterText>
        </TitleContainer>
        <FormContainer>
          <FieldContainer>
            <InputTitleText>Serial Number</InputTitleText>
            <InputField
              onChange={onChangeSerialNumber}
              value={serialNumber}
              placeholder="Enter Number"
              validate={input =>
                validateSerialNumberInput(
                  result => setShowError(!result),
                  input,
                )
              }
              isValid={!showError}
              keyboardType="number-pad"
            />
          </FieldContainer>
          <ErrorContainer>
            {showError ? (
              <RedText>
                <Body2Subtext>Oh no! Invalid serial number.</Body2Subtext>
              </RedText>
            ) : null}
          </ErrorContainer>
        </FormContainer>

        <ButtonMagenta disabled={showError} onPress={handleVoucherAdd}>
          <ButtonTextWhite>Add Voucher</ButtonTextWhite>
        </ButtonMagenta>
        <ButtonWhite
          onPress={() => navigation.navigate('ReviewScreen')}
          disabled={isEmpty}
        >
          <ButtonTextBlack>
            <H4CardNavTab>Review and Submit</H4CardNavTab>
          </ButtonTextBlack>
        </ButtonWhite>
      </BodyContainer>
    </SafeArea>
  );
}
