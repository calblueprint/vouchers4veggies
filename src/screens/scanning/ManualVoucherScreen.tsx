import React, { useState } from 'react';
import { z } from 'zod';
import { Logs } from 'expo';
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

Logs.enableExpoCliLogging();

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
    try {
      const SNSchema = z.coerce.number().gt(0);
      SNSchema.parse(transactionID);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const validateCurrencyFormat = (input: string) => {
    // confirms that any input has either 0 or 2 decimal digits
    const inputParts = input.split('.');
    if (inputParts.length > 1 && inputParts[1].length !== 2) {
      return false; // falsy value raises the error in zod
    }
    return true;
  };

  const validateVoucherAmount = () => {
    try {
      const currencySchema = z.coerce
        .number() // ensures that input is a valid number
        .gt(0)
        .lte(10) // less than or equal to 10 dollars
        .refine(() => validateCurrencyFormat(voucherAmount), {
          message: 'Input must be in a valid currency format',
        });
      currencySchema.parse(voucherAmount);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
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
              validate={validateSerialNumberInput}
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
              validate={validateVoucherAmount}
              inputMode="numeric"
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
