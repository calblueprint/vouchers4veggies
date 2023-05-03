import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';

export type CustomProps = {
  isSelected: boolean;
};

export const RootNavBackButton = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  width: 70px;
  padding: 9px;
`;

export const RadioButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  margin-horizontal: 10px;
`;

export const RadioButtonBase = styled.View`
  height: 22px;
  width: 22px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${(props: CustomProps) =>
    props.isSelected ? Colors.magenta : Colors.midGray};
  align-items: center;
  justify-content: center;
`;

export const RadioButtonFill = styled.View`
  height: 14px;
  width: 14px;
  border-radius: 7px;
  background-color: ${Colors.magenta};
`;

export const RowWithBottomMargin = styled.View`
  margin-bottom: 21px;
`;
