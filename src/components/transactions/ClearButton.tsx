import React from 'react';
import { ClearButtonContainer, RightAlignContainer } from './styles';
import { BlueText, Body1Text, MidGrayText } from '../../../assets/Fonts';

type ClearButtonProps = {
  isDisabled: boolean;
};
export default function ClearButton({ isDisabled }: ClearButtonProps) {
  if (!isDisabled) {
    return (
      <RightAlignContainer>
        <ClearButtonContainer>
          <BlueText>
            <Body1Text>Clear</Body1Text>
          </BlueText>
        </ClearButtonContainer>
      </RightAlignContainer>
    );
  }
  return (
    <RightAlignContainer>
      <ClearButtonContainer disabled>
        <MidGrayText>
          <Body1Text>Clear</Body1Text>
        </MidGrayText>
      </ClearButtonContainer>
    </RightAlignContainer>
  );
}
