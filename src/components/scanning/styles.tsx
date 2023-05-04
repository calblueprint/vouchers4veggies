import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

export const IconContainer = styled.View`
  margin-right: -16px;
  margin-left: 22px;
`;

export const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 8,
  },
});
