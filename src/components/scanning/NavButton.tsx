import React from 'react';
import { NavButtonBase, NavButtonText } from './styles';

type NavButtonProps = {
  isSelected: boolean;
  onPress: () => void;
  text: string;
};

export default function NavButton({
  isSelected,
  onPress,
  text,
}: NavButtonProps) {
  return (
    <NavButtonBase isSelected={isSelected} onPress={onPress}>
      <NavButtonText isSelected={isSelected}>{text}</NavButtonText>
    </NavButtonBase>
  );
}
