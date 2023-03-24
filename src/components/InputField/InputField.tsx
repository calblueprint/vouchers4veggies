import React, { useState } from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import Colors from '../../../assets/Colors';
import Styles from './styles';

type InputFieldProps = {
  onChange: (text: string) => void;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  validate?: (text: string) => void;
  isValid?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export default function InputField({
  onChange,
  value,
  placeholder,
  secureTextEntry = false,
  validate,
  isValid = true,
  keyboardType,
}: InputFieldProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <TextInput
      onBlur={() => {
        setIsActive(false);
        if (validate) {
          validate(value);
        }
      }}
      onFocus={() => setIsActive(true)}
      onChangeText={onChange}
      style={
        // eslint-disable-next-line no-nested-ternary
        isActive
          ? Styles.FormFieldFocus
          : isValid
          ? Styles.FormField
          : Styles.FormFieldError
      }
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
