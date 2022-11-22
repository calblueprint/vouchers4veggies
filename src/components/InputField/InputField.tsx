import React, { useState } from 'react';
import { TextInput } from 'react-native';
import Colors from '../../../assets/Colors';
import { Styles } from './styles';

export function InputField(props: any) {
  const [isActive, setIsActive] = useState(false);

  return (
    <TextInput
      onBlur={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onChangeText={newText => props.onChange(newText)}
      style={isActive ? Styles.FormFieldFocus : Styles.FormField}
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor={Colors.midGray}
      secureTextEntry={props.secureTextEntry}
      autoCorrect={false}
      autoCapitalize="none"
    />
  );
}
