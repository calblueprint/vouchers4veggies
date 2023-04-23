import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { SelectedFilterTag, UnselectedFilterTag } from './styles';
import { OneLine } from '../common/styles';
import { CenterText, MidGrayText } from '../../../assets/Fonts';

type FilterTagProps = {
  isSelected: boolean;
  children: ReactElement;
  onPress: () => void;
  minWidth?: number | string;
  margin?: number;
};
export default function FilterTag({
  isSelected,
  children,
  onPress,
  minWidth = 'auto',
  margin = 0,
}: FilterTagProps) {
  if (isSelected) {
    return (
      <View style={{ marginRight: margin }}>
        <SelectedFilterTag onPress={onPress}>
          <OneLine>
            <CenterText style={{ minWidth }}>{children}</CenterText>
          </OneLine>
        </SelectedFilterTag>
      </View>
    );
  }
  return (
    <View style={{ marginRight: margin }}>
      <UnselectedFilterTag onPress={onPress}>
        <OneLine>
          <CenterText style={{ minWidth }}>
            <MidGrayText>{children}</MidGrayText>
          </CenterText>
        </OneLine>
      </UnselectedFilterTag>
    </View>
  );
}
