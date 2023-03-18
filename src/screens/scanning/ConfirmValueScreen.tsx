import React, { useState } from 'react';
import CurrencyInput from 'react-native-currency-input';
import { TextInput } from 'react-native';
import { ButtonMagenta, ButtonWhite } from '../../../assets/Components';
import Colors from '../../../assets/Colors';
import Styles from '../../components/InputField/styles';
import {
  ButtonTextWhite,
  ButtonTextBlack,
  H4CardNavTab,
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
import { useScanningContext } from './ScanningContext';
import { testContext } from '../../utils/scanningUtils';

export default function ConfirmValueScreen({
  navigation,
}: ScannerStackScreenProps<'ConfirmValueScreen'>) {
  const [voucherAmount, setVoucherAmount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { isEmpty, dispatch } = useScanningContext();

  const onChangeVoucherAmount = (value: number) => {
    setVoucherAmount(value ?? 0.0);
  };

  const handleVoucherAdd = () => {
    testContext(dispatch);
    // navigation.navigate('ManualVoucherScreen');
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
        <ButtonWhite disabled={isEmpty}>
          <ButtonTextBlack>
            <H4CardNavTab>Review and Submit</H4CardNavTab>
          </ButtonTextBlack>
        </ButtonWhite>
      </BodyContainer>
    </SafeArea>
  );
}
