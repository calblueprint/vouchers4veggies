import React from 'react';
import { ClearButtonBase } from './styles';
import { BlueText, Body1Text, MidGrayText } from '../../../assets/Fonts';

type ClearButtonProps = {
  isDisabled: boolean;
  onPress: () => void;
};
export default function ClearButton({ isDisabled, onPress }: ClearButtonProps) {
  if (!isDisabled) {
    return (
      <ClearButtonBase onPress={onPress}>
        <BlueText>
          <Body1Text>Clear</Body1Text>
        </BlueText>
      </ClearButtonBase>
    );
  }
  return (
    <ClearButtonBase disabled>
      <MidGrayText>
        <Body1Text>Clear</Body1Text>
      </MidGrayText>
    </ClearButtonBase>
  );
}
