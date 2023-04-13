import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';

export const OneLine = styled.TouchableOpacity`
  display: flex;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 21px;
`;

export const LeftAlignContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
`;

export const RightAlignContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
`;

export const RadioButtonUnselected = styled.View`
  height: 22px;
  width: 22px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${Colors.midGray};
  align-items: center;
  justify-content: center;
`;

export const RadioButtonSelected = styled.View`
  height: 22px;
  width: 22px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${Colors.magenta};
  align-items: center;
  justify-content: center;
`;

export const RadioButtonFill = styled.View`
  height: 14px;
  width: 14px;
  border-radius: 7px;
  background-color: ${Colors.magenta};
`;
