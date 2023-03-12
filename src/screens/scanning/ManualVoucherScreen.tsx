import React, { useState } from 'react';
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
import StandardHeader from '../../components/common/StandardHeader';

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

  return (
    <SafeArea>
      <StandardHeader>
        <Header>
          <StandardLogo />
        </Header>
      </StandardHeader>

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
              onChange={setID}
              value={transactionID}
              placeholder="Enter ID"
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
              onChange={setVoucherAmount}
              value={voucherAmount}
              placeholder="Enter Amount"
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
