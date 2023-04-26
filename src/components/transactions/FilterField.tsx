import React, { ReactElement } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { SelectedFilterField, UnselectedFilterField } from './styles';
import { OneLine, RightAlignContainer } from '../common/styles';
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
  if (isSelected) {
    return (
      <SelectedFilterField onPress={onPress} style={{ width: '100%' }}>
        <OneLine>
          <View>{children}</View>
          {icon ? (
            <RightAlignContainer>
              <MaterialIcons name={icon} size={16} color={Colors.darkGray} />
            </RightAlignContainer>
          ) : null}
        </OneLine>
      </SelectedFilterField>
    );
  }
  return (
    <UnselectedFilterField onPress={onPress} style={{ width: '100%' }}>
      <OneLine>
        <View>{children}</View>
        {icon ? (
          <RightAlignContainer>
            <MaterialIcons name={icon} size={16} color={Colors.darkGray} />
          </RightAlignContainer>
        ) : null}
      </OneLine>
    </UnselectedFilterField>
  );
}
