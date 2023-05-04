import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BlueText, Body1Text, MidGrayText } from '../../../assets/Fonts';

type ClearButtonProps = {
  isDisabled: boolean;
  onPress: () => void;
};

export default function ClearButton({ isDisabled, onPress }: ClearButtonProps) {
  if (!isDisabled) {
    return (
      <TouchableOpacity onPress={onPress}>
        <BlueText>
          <Body1Text>Clear</Body1Text>
        </BlueText>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity disabled>
      <MidGrayText>
        <Body1Text>Clear</Body1Text>
      </MidGrayText>
    </TouchableOpacity>
  );
}
