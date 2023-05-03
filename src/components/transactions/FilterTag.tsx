import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { FilterTagBase } from './styles';
import { Row } from '../../../assets/Components';
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
  const handleOnPress = () => {
    if (isSelected) {
      onSelectedPress();
    } else {
      onUnselectedPress();
    }
  };

  return (
    <View style={{ marginRight: margin }}>
      <FilterTagBase isSelected={isSelected} onPress={handleOnPress}>
        <Row>
          <CenterText style={{ minWidth }}>
            {isSelected ? (
              <WhiteText>{children}</WhiteText>
            ) : (
              <MidGrayText>{children}</MidGrayText>
            )}
          </CenterText>
        </Row>
      </FilterTagBase>
    </View>
  );
}
