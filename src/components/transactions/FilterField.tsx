import React, { ReactElement } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { FilterFieldBase } from './styles';
import { Row, RightAlignContainer } from '../../../assets/Components';
import Colors from '../../../assets/Colors';

type FilterFieldProps = {
  isSelected: boolean;
  children: ReactElement;
  onPress: () => void;
  icon?: 'calendar-today' | null;
};

export default function FilterField({
  isSelected,
  children,
  onPress,
  icon = null,
}: FilterFieldProps) {
  return (
    <FilterFieldBase isSelected={isSelected} onPress={onPress}>
      <Row>
        {children}
        {icon && (
          <RightAlignContainer>
            <MaterialIcons name={icon} size={16} color={Colors.darkGray} />
          </RightAlignContainer>
        )}
      </Row>
    </FilterFieldBase>
  );
}
