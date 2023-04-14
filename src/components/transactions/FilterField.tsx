import React, { ReactElement } from 'react';
import { SelectedFilterField, UnselectedFilterField } from './styles';

type FilterFieldProps = {
  isSelected: boolean;
  children: ReactElement;
  onPress: () => void;
  width?: number | string;
  minWidth?: number | string;
};
export default function FilterField({
  isSelected,
  children,
  onPress,
  width = 'auto',
  minWidth = 'auto',
}: FilterFieldProps) {
  if (isSelected) {
    return (
      <SelectedFilterField onPress={onPress} style={{ width, minWidth }}>
        {children}
      </SelectedFilterField>
    );
  }
  return (
    <UnselectedFilterField onPress={onPress} style={{ width, minWidth }}>
      {children}
    </UnselectedFilterField>
  );
}
