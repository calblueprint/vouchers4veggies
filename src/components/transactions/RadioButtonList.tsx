import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  RadioButtonBase,
  RadioButtonContainer,
  RadioButtonFill,
  styles,
} from './styles';
import { Body1Text } from '../../../assets/Fonts';
import { LeftAlignContainer, Row } from '../../../assets/Components';

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
    <>
      {data.map((item, index) => (
        <TouchableOpacity
          key={item}
          onPress={() => setSelected(index)}
          style={styles.topSpacing}
        >
          <Row>
            <LeftAlignContainer>
              <Body1Text>{item}</Body1Text>
            </LeftAlignContainer>
            <RadioButtonContainer>
              <RadioButtonBase isSelected={selected === index}>
                {selected === index && <RadioButtonFill />}
              </RadioButtonBase>
            </RadioButtonContainer>
          </Row>
        </TouchableOpacity>
      ))}
    </>
  );
}
