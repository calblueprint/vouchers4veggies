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

type RadioButtonListProps = {
  data: string[];
  selected: number;
  setSelected: (index: number) => void;
};

export default function RadioButtonList({
  data,
  selected,
  setSelected,
}: RadioButtonListProps) {
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
                selected === index && <RadioButtonFill />
              </RadioButtonBase>
            </RadioButtonContainer>
          </SelectableRow>
        </RowWithBottomMargin>
      ))}
    </View>
  );
}
