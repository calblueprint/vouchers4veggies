import React, { useState } from 'react';
import CurrencyInput from 'react-native-currency-input';
import { TextInput } from 'react-native';
import { ButtonMagenta } from '../../../assets/Components';
import Colors from '../../../assets/Colors';
import Styles from '../../components/InputField/styles';
import {
  ButtonTextWhite,
  CenterText,
  H2Heading,
  InputTitleText,
} from '../../../assets/Fonts';
import {
  TitleContainer,
  Header,
  BodyContainer,
  SafeArea,
  DropDownContainer,
  FieldContainer,
  FormContainer,
} from './styles';
import InputField from '../../components/InputField/InputField';
import StandardLogo from '../../components/common/StandardLogo';
import { validateSerialNumberInput } from '../../utils/validationUtils';
import { ScannerStackScreenProps } from '../../navigation/types';

export default function ManualVoucherScreen({
  navigation,
}: ScannerStackScreenProps<'ManualVoucherScreen'>) {
  const [transactionID, setID] = useState<string>('');
  const [voucherAmount, setVoucherAmount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  // to be used for backend
  // const [scanCounter, incrementScanned] = useState(0);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   { label: 'Apple', value: 'apple' },
  //   { label: 'Banana', value: 'banana' },
  // ]);

  const onChangeSerialNumber = (text: string) => {
    const value = text.replace(/\D/g, '');
    setID(value);
  };

  const onChangeVoucherAmount = (value: number) => {
    setVoucherAmount(value ?? 0.0);
  };

  const handleVoucherAdd = () => {
    navigation.navigate('ConfirmValueScreen');
  };

  return (
    <SafeArea>
      <Header>
        <StandardLogo />
      </Header>

      <BodyContainer>
        <TitleContainer>
          <CenterText>
            <H2Heading>Add a voucher</H2Heading>
          </CenterText>
        </TitleContainer>
        <FormContainer>
          <FieldContainer>
            <InputTitleText>Transaction ID</InputTitleText>
            <InputField
              onChange={onChangeSerialNumber}
              value={transactionID}
              placeholder="Enter ID"
              validate={validateSerialNumberInput}
              keyboardType="number-pad"
            />
            <DropDownContainer />
          </FieldContainer>
          <FieldContainer>
            <InputTitleText>Amount</InputTitleText>
            <CurrencyInput // TODO: refactor currency input with custom text input base components
              value={voucherAmount}
              onChangeValue={onChangeVoucherAmount}
              renderTextInput={props => (
                <TextInput
                  {...props}
                  onBlur={() => setIsActive(false)}
                  onFocus={() => setIsActive(true)}
                  style={isActive ? Styles.FormFieldFocus : Styles.FormField}
                  placeholderTextColor={Colors.midGray}
                  secureTextEntry={false}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  returnKeyType="done"
                />
              )}
              prefix="$"
              minValue={0}
              maxValue={10}
              separator="."
              precision={2}
            />
          </FieldContainer>
        </FormContainer>
        <ButtonMagenta onPress={handleVoucherAdd}>
          <ButtonTextWhite>Add Voucher</ButtonTextWhite>
        </ButtonMagenta>
      </BodyContainer>
    </SafeArea>
  );
}
