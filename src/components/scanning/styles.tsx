import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';
import { SelectionProps } from '../../types/types';

export const IconContainer = styled.View`
  margin-right: -16px;
  margin-left: 22px;
`;

export const NavButtonBase = styled.Pressable`
  width: 33.333%;
  border-bottom-width: 3px;
  border-color: ${(props: SelectionProps) =>
    props.isSelected ? Colors.magenta : Colors.lightGray};
`;

export const NavButtonText = styled.Text`
  text-align: center;
  padding-vertical: 11px;
  font-size: 14px;
  color: ${(props: SelectionProps) =>
    props.isSelected ? Colors.magenta : Colors.midGray};
  font-family: manrope-bold;
`;

export const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 8,
  },
});
