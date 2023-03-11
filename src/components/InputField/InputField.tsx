import React, { useState } from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import Colors from '../../../assets/Colors';
import Styles from './styles';

type InputFieldProps = {
  onChange: (text: string) => void;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  validate?: () => void;
  inputMode?: KeyboardTypeOptions;
};

export default function InputField({
  onChange,
  value,
  placeholder,
  secureTextEntry = false,
  validate,
  inputMode,
}: InputFieldProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <TextInput
      onBlur={() => {
        setIsActive(false);
        validate?.();
      }}
      onFocus={() => setIsActive(true)}
      onChangeText={onChange}
      style={isActive ? Styles.FormFieldFocus : Styles.FormField}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={Colors.midGray}
      secureTextEntry={secureTextEntry}
      autoCorrect={false}
      autoCapitalize="none"
      keyboardType={inputMode}
      returnKeyType="done"
    />
  );
}
