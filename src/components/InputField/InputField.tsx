import React, { useState } from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import Colors from '../../../assets/Colors';
import Styles from './styles';

type InputFieldProps = {
  onChange: (text: string) => void;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  // validate?: (text: string) => void;
  isValid?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export default function InputField({
  onChange,
  value,
  placeholder,
  secureTextEntry = false,
  isValid = true,
  keyboardType,
}: InputFieldProps) {
  const [isActive, setIsActive] = useState(false);
  let textInputStyle;
  if (isActive) {
    textInputStyle = Styles.FormFieldFocus;
  } else if (isValid) {
    textInputStyle = Styles.FormField;
  } else {
    textInputStyle = Styles.FormFieldError;
  }

  return (
    <TextInput
      onEndEditing={() => {
        setIsActive(false);
      }}
      onFocus={() => setIsActive(true)}
      onChangeText={onChange}
      style={textInputStyle}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={Colors.midGray}
      secureTextEntry={secureTextEntry}
      autoCorrect={false}
      autoCapitalize="none"
      keyboardType={keyboardType}
      returnKeyType="done"
    />
  );
}
