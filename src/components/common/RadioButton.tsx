import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import {
  LeftAlignContainer,
  OneLine,
  RadioButtonFill,
  RadioButtonSelected,
  RadioButtonUnselected,
  RightAlignContainer,
  RowWithBottomMargin,
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
          <OneLine onPress={() => setSelected(index)}>
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
          </OneLine>
        </RowWithBottomMargin>
      ))}
    </View>
  );
}
