import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../../assets/Colors';
import Styles from './styles';

type InputFieldProps = {
  onChange: (text: string) => void;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  showVisibilityToggle?: boolean;
};

export default function InputField({
  onChange,
  value,
  placeholder,
  secureTextEntry = false,
  showVisibilityToggle = secureTextEntry,
}: InputFieldProps) {
  const [isActive, setIsActive] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <View>
      <TextInput
        onBlur={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        onChangeText={onChange}
        style={isActive ? Styles.FormFieldFocus : Styles.FormField}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors.midGray}
        secureTextEntry={
          showVisibilityToggle ? passwordVisibility : secureTextEntry
        }
        autoCorrect={false}
        autoCapitalize="none"
      />
      {showVisibilityToggle ? (
        <Pressable style={Styles.Icon} onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            name={passwordVisibility ? 'eye-outline' : 'eye-off-outline'}
            size={22}
            color={Colors.darkGray}
          />
        </Pressable>
      ) : null}
    </View>
  );
}
