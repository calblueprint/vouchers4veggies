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
export const ButtonContainer = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  margin-top: 32%;
  margin-left: 13%;
`;
export const ButtonPasswordContainer = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  margin-top: 41%;
  margin-left: 13%;
`;
export const EmailText = styled.Text`
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;

  color: #000000;
`;

export const ButtonBlank = styled.TouchableOpacity`
  box-sizing: border-box;
  width: 59px;
  height: 25px;
  left: 20;
  border: 1px solid #f2f2f2;
`;

export const MagentaButtonContainer = styled.View`
  flex-direction: top;
  justify-content: flex-start;
  align-items: center;
  margin-top: 92%;
`;
