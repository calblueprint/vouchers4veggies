import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

export const Row = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 67px;
  border: 0px solid ${Colors.lightGray};
  border-bottom-width: 1px;
  width: 100%;
`;

export const CardContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
