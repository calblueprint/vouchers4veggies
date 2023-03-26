import React, { useState } from 'react';
import { View } from 'react-native';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { ButtonMagenta, RootNavBackButton } from '../../../assets/Components';
import {
  Body1Text,
  H2Heading,
  ButtonTextWhite,
  DarkGrayText,
} from '../../../assets/Fonts';
import InputField from '../../components/InputField/InputField';
import { ProfileStackScreenProps } from '../../navigation/types';
import {
  BackButtonContainer,
  EmailHeadingContainer,
  FormContainer,
  InputFieldContainer,
} from './styles';

export default function EditEmailScreen({
  navigation,
}: ProfileStackScreenProps<'EditEmailScreen'>) {
  const [email, setEmail] = useState('');
  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  return (
    <View>
      <BackButtonContainer>
        <RootNavBackButton onPress={() => navigation.navigate('ProfileScreen')}>
          <DarkGrayText>
            <Icon name="left" size={14} color={Colors.black} /> Back
          </DarkGrayText>
        </RootNavBackButton>
      </BackButtonContainer>

      <FormContainer>
        <EmailHeadingContainer>
          <H2Heading>Edit Phone Number</H2Heading>
        </EmailHeadingContainer>
        <InputFieldContainer>
          <Body1Text>Phone Number</Body1Text>
          <InputField
            value={email}
            placeholder="(123) 456-7890"
            onChange={onChangeEmail}
          />
        </InputFieldContainer>
        <ButtonMagenta>
          <ButtonTextWhite>Update Phone Number</ButtonTextWhite>
        </ButtonMagenta>
      </FormContainer>
    </View>
  );
}
