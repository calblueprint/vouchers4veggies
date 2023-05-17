import React from 'react';
import { NavButtonBase, NavButtonText } from './styles';

type NavButtonProps = {
  isSelected: boolean;
  onPress: () => void;
  title: string;
};

export default function NavButton({
  isSelected,
  onPress,
  title,
}: NavButtonProps) {
  return (
    <NavButtonBase isSelected={isSelected} onPress={onPress}>
      <NavButtonText isSelected={isSelected}>{title}</NavButtonText>
    </NavButtonBase>
  );
}
