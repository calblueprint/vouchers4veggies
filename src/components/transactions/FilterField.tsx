import React, { ReactElement } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import {
  RightAlignContainer,
  SelectedFilterField,
  Styles,
  UnselectedFilterField,
} from './styles';
import { OneLine } from '../common/styles';
import Colors from '../../../assets/Colors';

type FilterFieldProps = {
  isSelected: boolean;
  children: ReactElement;
  onPress: () => void;
  width?: number | string;
  minWidth?: number | string;
  useCalendarIcon?: boolean;
  centerText?: boolean;
};
export default function FilterField({
  isSelected,
  children,
  onPress,
  width = 'auto',
  minWidth = 'auto',
  useCalendarIcon = false,
  centerText = false,
}: FilterFieldProps) {
  if (isSelected) {
    return (
      <SelectedFilterField onPress={onPress} style={{ width, minWidth }}>
        <OneLine>
          {centerText ? (
            <View style={{ width: '100%' }}>{children}</View>
          ) : (
            <View>{children}</View>
          )}
          {useCalendarIcon ? (
            <RightAlignContainer>
              <MaterialIcons
                name="calendar-today"
                size={16}
                color={Colors.darkGray}
                style={Styles.filterFieldIcon}
              />
            </RightAlignContainer>
          ) : null}
        </OneLine>
      </SelectedFilterField>
    );
  }
  return (
    <UnselectedFilterField onPress={onPress} style={{ width, minWidth }}>
      <OneLine>
        {centerText ? (
          <View style={{ width: '100%' }}>{children}</View>
        ) : (
          <View>{children}</View>
        )}
        {useCalendarIcon ? (
          <RightAlignContainer>
            <MaterialIcons
              name="calendar-today"
              size={16}
              color={Colors.darkGray}
              style={Styles.filterFieldIcon}
            />
          </RightAlignContainer>
        ) : null}
      </OneLine>
    </UnselectedFilterField>
  );
}
