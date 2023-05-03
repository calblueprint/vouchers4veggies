import React from 'react';
import { View } from 'react-native';
import {
  RadioButtonBase,
  RadioButtonContainer,
  RadioButtonFill,
  RowWithBottomMargin,
} from './styles';
import { Body1Text } from '../../../assets/Fonts';
import { LeftAlignContainer, SelectableRow } from '../../../assets/Components';

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
            <RadioButtonContainer>
              <RadioButtonBase isSelected={selected === index}>
                {selected === index ? <RadioButtonFill /> : null}
              </RadioButtonBase>
            </RadioButtonContainer>
          </SelectableRow>
        </RowWithBottomMargin>
      ))}
    </View>
  );
}
