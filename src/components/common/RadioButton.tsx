import React from 'react';
import { View } from 'react-native';
import {
  RadioButtonFill,
  RadioButtonSelected,
  RadioButtonUnselected,
  RowWithBottomMargin,
} from './styles';
import { Body1Text } from '../../../assets/Fonts';
import {
  LeftAlignContainer,
  RightAlignContainer,
  SelectableRow,
} from '../../../assets/Components';

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
          <SelectableRow onPress={() => setSelected(index)}>
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
          </SelectableRow>
        </RowWithBottomMargin>
      ))}
    </View>
  );
}
