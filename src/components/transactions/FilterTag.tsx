import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { SelectedFilterTag, UnselectedFilterTag } from './styles';
import { OneLine } from '../common/styles';
import { CenterText, MidGrayText, WhiteText } from '../../../assets/Fonts';

type FilterTagProps = {
  isSelected: boolean;
  children: ReactElement;
  onSelectedPress: () => void;
  onUnselectedPress: () => void;
  minWidth?: number | string;
  margin?: number;
};
export default function FilterTag({
  isSelected,
  children,
  onSelectedPress,
  onUnselectedPress,
  minWidth = 'auto',
  margin = 0,
}: FilterTagProps) {
  if (isSelected) {
    return (
      <View style={{ marginRight: margin }}>
        <SelectedFilterTag onPress={onSelectedPress}>
          <OneLine>
            <CenterText style={{ minWidth }}>
              <WhiteText>{children}</WhiteText>
            </CenterText>
          </OneLine>
        </SelectedFilterTag>
      </View>
    );
  }
  return (
    <View style={{ marginRight: margin }}>
      <UnselectedFilterTag onPress={onUnselectedPress}>
        <OneLine>
          <CenterText style={{ minWidth }}>
            <MidGrayText>{children}</MidGrayText>
          </CenterText>
        </OneLine>
      </UnselectedFilterTag>
    </View>
  );
}
