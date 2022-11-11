import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import {
  H3_Subheading,
  Body_2_Subtext,
  Body_1_Text,
} from '../../../assets/Fonts';
import { Colors } from '../../../assets/Colors';
import {
  Row,
  DateIdContainer,
  CountContainer,
  PriceContainer,
  Styles,
} from './styles';

export const InputField = (props: any) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <TextInput
      onBlur={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onChangeText={newText => props.onChange(newText)}
      style={isActive ? Styles.FormFieldFocus : Styles.FormField}
      value={props.value}
      secureTextEntry={props.secureTextEntry}
    />
  );
};
