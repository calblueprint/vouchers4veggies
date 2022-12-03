import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Styles } from './styles';
import { Colors } from '../../../assets/Colors';

export const PasswordInput = (props: any) => {
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
};

export const togglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

  const handlePasswordVisibility = () => {
    if (rightIcon == 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon == 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};
