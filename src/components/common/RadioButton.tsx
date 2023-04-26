import React from 'react';
import { View } from 'react-native';
import {
  LeftAlignContainer,
  RadioButtonFill,
  RadioButtonSelected,
  RadioButtonUnselected,
  RightAlignContainer,
  RowWithBottomMargin,
  SelectableOneLine,
} from './styles';
import { Body1Text } from '../../../assets/Fonts';

type RadioButtonProps = {
  data: string[];
  selected: number;
  setSelected: (index: number) => void;
};

export default function RadioButtons({
  data,
  selected,
  setSelected,
}: RadioButtonProps) {
  return (
    <View>
      {data.map((item, index) => (
        <RowWithBottomMargin key={item}>
          <SelectableOneLine onPress={() => setSelected(index)}>
            <LeftAlignContainer>
              <Body1Text>{item}</Body1Text>
            </LeftAlignContainer>
            <RightAlignContainer>
              {selected === index ? (
                <RadioButtonSelected>
                  <RadioButtonFill />
                </RadioButtonSelected>
              ) : (
                <RadioButtonUnselected />
              )}
            </RightAlignContainer>
          </SelectableOneLine>
        </RowWithBottomMargin>
      ))}
    </View>
  );
}
