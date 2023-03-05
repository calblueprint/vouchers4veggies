import React, { useState } from 'react';
import { z } from 'zod';
import { ButtonMagenta } from '../../../assets/Components';
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

function ManualVoucherScreen() {
  const [transactionID, setID] = useState<string>('');
  const [voucherAmount, setVoucherAmount] = useState<string>('');

  // to be used for backend
  // const [scanCounter, incrementScanned] = useState(0);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   { label: 'Apple', value: 'apple' },
  //   { label: 'Banana', value: 'banana' },
  // ]);

  const SNonChange = (text: string) => {
    const value = text.replace(/\D/g, '');
    setID(value);
  };

  const VAonChange = (text: string) => {
    const value = text.replace(/[^\d.]/g, '');
    setVoucherAmount(value);
  };

  const validateSerialNumberInput = () => {
    const SNSchema = z.coerce.number().gt(0);
    SNSchema.parse(transactionID);
  };

  const validateVoucherAmount = () => {
    const currencySchema = z.coerce
      .number() // ensures that input is a valid number
      .gt(0)
      .lte(10) // less than or equal to 10 dollars
      .refine(
        input => {
          // confirms that any input has either 0 or 2 decimal digits
          const inputParts = String(input).split('.');

          if (inputParts.length > 1 && inputParts[1].length !== 2) {
            return true;
          }
          return false;
        },
        {
          message: 'Input must be in a valid currency format',
        },
      );
    currencySchema.parse(voucherAmount);
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
              onChange={SNonChange}
              value={transactionID}
              placeholder="Enter ID"
              onUnfocus={validateSerialNumberInput}
              inputMode="number-pad"
            />
          </FieldContainer>
          <FieldContainer>
            <InputTitleText>Voucher Color</InputTitleText>
            {/* TODO: implement dropdown component */}
            <DropDownContainer />
          </FieldContainer>
          <FieldContainer>
            <InputTitleText>Amount</InputTitleText>
            <InputField
              onChange={VAonChange}
              value={voucherAmount}
              placeholder="Enter Amount"
              onUnfocus={validateVoucherAmount}
              inputMode="decimal-pad"
            />
          </FieldContainer>
        </FormContainer>
        <ButtonMagenta>
          <ButtonTextWhite>Add Voucher</ButtonTextWhite>
        </ButtonMagenta>
      </BodyContainer>
    </SafeArea>
  );
}

export default ManualVoucherScreen;
