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
  EmailHeadingContainer,
  FormContainer,
  IconBackContainer,
  InputFieldContainer,
} from './styles';

export default function EditPhoneScreen({
  navigation,
}: ProfileStackScreenProps<'ProfileScreen'>) {
  const [phone, setPhone] = useState('');
  const onChangeEmail = (value: string) => {
    setPhone(value);
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
          <H2Heading>Edit Email</H2Heading>
        </EmailHeadingContainer>
        <InputFieldContainer>
          <Body1Text>Email</Body1Text>
          <InputField
            value={phone}
            placeholder="email@gmail.com"
            onChange={onChangeEmail}
          />
        </InputFieldContainer>
        <ButtonMagenta>
          <ButtonTextWhite>Update Email</ButtonTextWhite>
        </ButtonMagenta>
      </FormContainer>
    </View>
  );
}
