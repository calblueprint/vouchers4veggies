import React, { useState } from 'react';
import { TextInput } from 'react-native';
import Colors from '../../../assets/Colors';
import Styles from './styles';

type InputFieldProps = {
  onChange: (text: string) => void;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  onUnfocus?: () => void;
};

export default function InputField({
  onChange,
  value,
  placeholder,
  secureTextEntry = false,
  onUnfocus,
}: InputFieldProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <TextInput
      onBlur={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onChangeText={onChange}
      onEndEditing={onUnfocus}
      style={isActive ? Styles.FormFieldFocus : Styles.FormField}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={Colors.midGray}
      secureTextEntry={secureTextEntry}
      autoCorrect={false}
      autoCapitalize="none"
    />
  );
}
