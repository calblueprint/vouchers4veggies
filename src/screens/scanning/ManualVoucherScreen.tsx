import React, { useState } from 'react';
import { ButtonMagenta } from '../../../assets/Components';
import {
  Body_1_Text,
  ButtonTextWhite,
  CenterText,
  H2Heading,
  InputTitleText,
} from '../../../assets/Fonts';
import { VoucherType } from '../../types/types';
import {
  LogoContainer,
  PageContainer,
  TitleContainer,
  Header,
  BodyContainer,
  SafeArea,
  DropDownContainer,
  FieldContainer,
  FormContainer,
} from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import { InputField } from '../../components/InputField/InputField';

const v4vLogo = require('../../../assets/logo-1.png');

const ManualVoucherScreen = () => {
  const [scanned, setScanned] = useState<boolean>(false);
  const [scanCounter, incrementScanned] = useState(0);
  const [transactionID, setID] = useState<String>();
  const [voucherAmount, setVoucherAmount] = useState<String>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]);

  return (
    <SafeArea>
      <PageContainer>
        <Header>
          <LogoContainer source={v4vLogo}></LogoContainer>
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
                onChange={setID}
                value={transactionID}
                placeholder="Enter ID"
              />
            </FieldContainer>
            <FieldContainer>
              <InputTitleText>Voucher Color</InputTitleText>
              <DropDownContainer></DropDownContainer>
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
      </PageContainer>
    </SafeArea>
  );
};

export default ManualVoucherScreen;
