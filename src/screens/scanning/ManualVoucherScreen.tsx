import React, { useState } from 'react';
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
import InputField from '../../components/InputField/InputField';
import StandardLogo from '../../components/common/StandardLogo';
import { validateSerialNumberInput } from '../../utils/validationUtils';
import { ScannerStackScreenProps } from '../../navigation/types';

export default function ManualVoucherScreen({
  navigation,
}: ScannerStackScreenProps<'ManualVoucherScreen'>) {
  const [transactionID, setID] = useState<string>('');

  const onChangeSerialNumber = (text: string) => {
    const value = text.replace(/\D/g, '');
    setID(value);
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
          </FieldContainer>
        </FormContainer>
        <ButtonMagenta onPress={handleVoucherAdd}>
          <ButtonTextWhite>Add Voucher</ButtonTextWhite>
        </ButtonMagenta>
        <ButtonGray>
          <ButtonTextWhite>Review and Submit</ButtonTextWhite>
        </ButtonGray>
      </BodyContainer>
    </SafeArea>
  );
}
