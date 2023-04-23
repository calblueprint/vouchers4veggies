import React, { ReactElement } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import {
  CenteredTextContainer,
  RightAlignContainer,
  SelectedFilterField,
  SelectedFilterTag,
  Styles,
  UnselectedFilterField,
  UnselectedFilterTag,
} from './styles';
import { OneLine } from '../common/styles';
import Colors from '../../../assets/Colors';
import { CenterText, MidGrayText } from '../../../assets/Fonts';

type FilterTagProps = {
  isSelected: boolean;
  children: ReactElement;
  onPress: () => void;
  minWidth?: number | string;
};
export default function FilterTag({
  isSelected,
  children,
  onPress,
  minWidth = 'auto',
}: FilterTagProps) {
  if (isSelected) {
    return (
      <SelectedFilterTag onPress={onPress}>
        <OneLine>
          <CenterText style={{ minWidth }}>{children}</CenterText>
        </OneLine>
      </SelectedFilterTag>
    );
  }
  return (
    <UnselectedFilterTag onPress={onPress}>
      <OneLine>
        <CenterText style={{ minWidth }}>
          <MidGrayText>{children}</MidGrayText>
        </CenterText>
      </OneLine>
    </UnselectedFilterTag>
  );
}
