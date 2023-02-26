import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';

// eslint-disable-next-line import/prefer-default-export
export const HeadingContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  margin-top: 14%;
  margin-bottom: 4%;
  word-break: break-all;
`;
export const ButtonContainer = styled.View`
  width: 152px;
  height: 48px;
  left: 29px;
  top: 253px;
`;
export const ButtonBlank = styled.Button`
  box-sizing: border-box;
  width: 59px;
  height: 25px;
  left: 20;

  /* H4 Card, Nav, Tab */
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  /* identical to box height */

  text-align: left;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
