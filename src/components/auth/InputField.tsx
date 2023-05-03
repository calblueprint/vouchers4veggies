import React, { useState } from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import Colors from '../../../assets/Colors';
import { styles, fieldIsInvalid, fieldFocused } from './styles';

type InputFieldProps = {
  onChange: (text: string) => void;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
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
    textInputStyle = fieldFocused;
  } else if (isValid) {
    textInputStyle = styles.fieldDefault;
  } else {
    textInputStyle = fieldIsInvalid;
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
