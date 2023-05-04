import React from 'react';
import { View } from 'react-native';
import {
  RadioButtonBase,
  RadioButtonContainer,
  RadioButtonFill,
  styles,
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
        <SelectableRow
          key={item}
          onPress={() => setSelected(index)}
          style={styles.bottomSpacing}
        >
          <LeftAlignContainer>
            <Body1Text>{item}</Body1Text>
          </LeftAlignContainer>
          <RadioButtonContainer>
            <RadioButtonBase isSelected={selected === index}>
              {selected === index && <RadioButtonFill />}
            </RadioButtonBase>
          </RadioButtonContainer>
        </SelectableRow>
      ))}
    </View>
  );
}
