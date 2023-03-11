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

  const onChangeSerialNumber = (text: string) => {
    const value = text.replace(/\D/g, '');
    setID(value);
  };

  const onChangeVoucherAmount = (text: string) => {
    const value = text.replace(/[^\d.]/g, '');
    setVoucherAmount(value);
  };

  const validateSerialNumberInput = (input: string) => {
    try {
      const SNSchema = z.coerce.number().gt(0);
      SNSchema.parse(input);
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

  const validateVoucherAmount = (input: string) => {
    try {
      const currencySchema = z.coerce
        .number() // ensures that input is a valid number
        .gt(0)
        .lte(10) // less than or equal to 10 dollars
        .refine(() => validateCurrencyFormat(input), {
          message: 'Input must be in a valid currency format',
        });
      currencySchema.parse(input);
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
              onChange={onChangeSerialNumber}
              value={transactionID}
              placeholder="Enter ID"
              validate={validateSerialNumberInput}
              keyboard="number-pad"
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
              onChange={onChangeVoucherAmount}
              value={voucherAmount}
              placeholder="Enter Amount"
              validate={validateVoucherAmount}
              keyboard="decimal-pad"
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
