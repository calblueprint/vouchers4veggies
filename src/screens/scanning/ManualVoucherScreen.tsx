import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  ButtonMagenta,
  ButtonWhite,
  AddManuallyButton,
} from '../../../assets/Components';
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
import InputField from '../../components/InputField/InputField';
import StandardLogo from '../../components/common/StandardLogo';
import { validateSerialNumberInput } from '../../utils/validationUtils';
import { ScannerStackScreenProps } from '../../navigation/types';
import Colors from '../../../assets/Colors';

export default function ManualVoucherScreen({
  navigation,
}: ScannerStackScreenProps<'ManualVoucherScreen'>) {
  const [transactionID, setID] = useState<string>('');
  const [isEmptyMap, setEmptyMap] = useState<boolean>(true);

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
        <AddManuallyButton
          onPress={() => navigation.navigate('ScanningScreen')}
        >
          <ButtonTextBlack>
            <Icon name="pluscircleo" size={14} color={Colors.midBlack} />
            {'  '}
            Scan Voucher
          </ButtonTextBlack>
        </AddManuallyButton>
      </Header>

      <BodyContainer>
        <TitleContainer>
          <CenterText>
            <H2Heading>Add a voucher</H2Heading>
          </CenterText>
        </TitleContainer>
        <FormContainer>
          <FieldContainer>
            <InputTitleText>Serial Number</InputTitleText>
            <InputField
              onChange={onChangeSerialNumber}
              value={transactionID}
              placeholder="Enter Number"
              validate={validateSerialNumberInput}
              keyboardType="number-pad"
            />
          </FieldContainer>
        </FormContainer>
        <ButtonMagenta onPress={handleVoucherAdd}>
          <ButtonTextWhite>Add Voucher</ButtonTextWhite>
        </ButtonMagenta>
        <ButtonWhite disabled={isEmptyMap}>
          <ButtonTextBlack>
            <H4CardNavTab>Review and Submit</H4CardNavTab>
          </ButtonTextBlack>
        </ButtonWhite>
      </BodyContainer>
    </SafeArea>
  );
}
