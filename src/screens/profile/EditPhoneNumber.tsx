import React, { useState } from 'react';
import { View } from 'react-native';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { ButtonMagenta } from '../../../assets/Components';
import { Body1Text, H2Heading, ButtonTextWhite } from '../../../assets/Fonts';
import InputField from '../../components/InputField/InputField';
import { ProfileStackScreenProps } from '../../navigation/types';
import {
  ButtonBlank,
  EmailHeadingContainer,
  FormContainer,
  IconBackContainer,
  InputFieldContainer,
} from './styles';

export default function EditEmailScreen({
  navigation,
}: ProfileStackScreenProps<'ProfileScreen'>) {
  const [email, setEmail] = useState('');
  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  return (
    <View>
      <ButtonBlank onPress={() => navigation.navigate('ProfileScreen')}>
        <IconBackContainer>
          <Icon name="right" size={60} color={Colors.black} />
        </IconBackContainer>
        <Body1Text>Back</Body1Text>
      </ButtonBlank>
      <FormContainer>
        <EmailHeadingContainer>
          <H2Heading>Edit Phone Number</H2Heading>
        </EmailHeadingContainer>
        <InputFieldContainer>
          <Body1Text>Phone Number</Body1Text>
          <InputField
            value={email}
            placeholder="email@gmail.com"
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
