import React, { useState } from 'react';
import { View } from 'react-native';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { ButtonMagenta } from '../../../assets/Components';
import { Body1Text, H2Heading, ButtonTextWhite } from '../../../assets/Fonts';
import InputField from '../../components/InputField/InputField';
import { ProfileStackScreenProps } from '../../navigation/types';
import {
  BackButtonContainer,
  ButtonBlank,
  EmailHeadingContainer,
  FormContainer,
  IconBackContainer,
  IconContainer,
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
      <View>
        <BackButtonContainer
          onPress={() => navigation.navigate('ProfileScreen')}
        >
          <IconBackContainer>
            <Icon name="left" size={20} color={Colors.black} />
            <Body1Text>Back</Body1Text>
          </IconBackContainer>
        </BackButtonContainer>
      </View>
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
