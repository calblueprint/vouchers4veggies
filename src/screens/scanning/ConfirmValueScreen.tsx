import React, { useState } from 'react';
import CurrencyInput from 'react-native-currency-input';
import { TextInput } from 'react-native';
import { ButtonMagenta, ButtonGray } from '../../../assets/Components';
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
  FieldContainer,
  FormContainer,
} from './styles';
import StandardLogo from '../../components/common/StandardLogo';
import { ScannerStackScreenProps } from '../../navigation/types';

export default function ConfirmValueScreen({
  navigation,
}: ScannerStackScreenProps<'ConfirmValueScreen'>) {
  const [voucherAmount, setVoucherAmount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const onChangeVoucherAmount = (value: number) => {
    setVoucherAmount(value ?? 0.0);
  };

  const handleVoucherAdd = () => {
    navigation.navigate('ManualVoucherScreen');
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
            <InputTitleText>Voucher Value</InputTitleText>
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
          <ButtonTextWhite>Confirm Value</ButtonTextWhite>
        </ButtonMagenta>
        <ButtonGray>
          <ButtonTextWhite>Review and Submit</ButtonTextWhite>
        </ButtonGray>
      </BodyContainer>
    </SafeArea>
  );
}
