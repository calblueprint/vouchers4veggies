import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BlueText, Body1Text, MidGrayText } from '../../../assets/Fonts';

type ClearButtonProps = {
  isDisabled: boolean;
  onPress: () => void;
};

export default function ClearButton({ isDisabled, onPress }: ClearButtonProps) {
  return (
    <TouchableOpacity disabled={isDisabled} onPress={onPress}>
      <Body1Text>
        {isDisabled ? (
          <MidGrayText>Clear</MidGrayText>
        ) : (
          <BlueText>Clear</BlueText>
        )}
      </Body1Text>
    </TouchableOpacity>
  );
}
