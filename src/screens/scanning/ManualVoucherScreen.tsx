import React, { useState } from 'react';
import { ButtonMagenta } from '../../../assets/Components';
import {
  ButtonTextWhite,
  CenterText,
  H2Heading,
  InputTitleText,
} from '../../../assets/Fonts';
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
import InputField from '../../components/InputField/InputField';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const v4vLogo = require('../../../assets/logo-1.png');

function ManualVoucherScreen() {
  const [scanned, setScanned] = useState<boolean>(false);
  const [scanCounter, incrementScanned] = useState(0);
  const [transactionID, setID] = useState<string>();
  const [voucherAmount, setVoucherAmount] = useState<string>();
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
          <LogoContainer source={v4vLogo} />
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
      </PageContainer>
    </SafeArea>
  );
}

export default ManualVoucherScreen;
