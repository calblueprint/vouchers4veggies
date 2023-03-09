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
} from './styles';

// eslint-disable-next-line no-empty-pattern
export default function EditEmailScreen({
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
      <EmailHeadingContainer>
        <H2Heading> Edit Email </H2Heading>
      </EmailHeadingContainer>
      <InputFieldStyling>
        <Body1Text style={Styles.bold}>Email</Body1Text>
        <InputField value={email} placeholder="email@gmail.com" />
      </InputFieldStyling>
      <GrayButtonContainer>
        <ButtonMagenta>
          <ButtonTextWhite>Update Email</ButtonTextWhite>
        </ButtonMagenta>
      </GrayButtonContainer>
    </View>
  );
}
