import React, { useState } from 'react';
import { TextInput, View, Pressable } from 'react-native';
import { Styles } from './styles';
import { Colors } from '../../../assets/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const PasswordInput = (props: any) => {
  const [isActive, setIsActive] = useState(false);
  const { passwordVisibility, handlePasswordVisibility } =
    togglePasswordVisibility();

  return (
    <View style={isActive ? Styles.FormFieldFocus : Styles.FormField}>
      <TextInput
        style={Styles.TextInputField}
        onBlur={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        onChangeText={newText => props.onChange(newText)}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.midGray}
        secureTextEntry={passwordVisibility}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Pressable onPress={handlePasswordVisibility}>
        <MaterialCommunityIcons
          name={passwordVisibility ? 'eye' : 'eye-off'}
          size={22}
          color="#232323"
        />
      </Pressable>
    </View>
  );
};

export const togglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return {
    passwordVisibility,
    handlePasswordVisibility,
  };
};
