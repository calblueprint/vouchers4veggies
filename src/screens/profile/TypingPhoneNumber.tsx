import React, { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { ButtonGray, InputField } from '../../../assets/Components';
import {
  H1Heading,
  Body1Text,
  H3Subheading,
  H4CardNavTab,
  H2Heading,
  ButtonTextWhite,
} from '../../../assets/Fonts';
import { ProfileStackScreenProps } from '../../navigation/types';
import { Styles } from '../auth/styles';
import { ButtonMagenta } from '../scanning/styles';
import {
  ButtonBlank,
  EmailHeadingContainer,
  EmailText,
  GrayButtonContainer,
  HeadingContainer,
  IconBackContainer,
  IconContainer,
  InputFieldStyling,
  PhoneHeadingContainer,
} from './styles';

// eslint-disable-next-line no-empty-pattern
export default function TypingPhoneNumber({
  navigation,
}: ProfileStackScreenProps<'ProfileScreen'>) {
  const [email, setEmail] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const onChangeEmail = (value: string) => {
    setShowErrorMessage(false);
    setEmail(value);
  };

  return (
    <View>
      <ButtonBlank
        title="Back"
        color="black"
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <IconBackContainer>
          <Icon name="right" size={60} color={Colors.black} />
        </IconBackContainer>
        <EmailText> Back</EmailText>
      </ButtonBlank>
      <PhoneHeadingContainer>
        <H2Heading> Edit Phone Number </H2Heading>
      </PhoneHeadingContainer>
      <InputFieldStyling>
        <Body1Text style={Styles.bold}>Phone Number</Body1Text>
        <InputField value={email} placeholder="email@gmail.com" />
      </InputFieldStyling>
      <GrayButtonContainer>
        <ButtonMagenta onPress={navigation.navigate('PhoneNumberEntered')}>
          <ButtonTextWhite>Update Phone Number</ButtonTextWhite>
        </ButtonMagenta>
      </GrayButtonContainer>
    </View>
  );
}
