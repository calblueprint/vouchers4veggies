import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';

// eslint-disable-next-line import/prefer-default-export
export const HeadingContainer = styled.Text`
  margin-top: 22%;
  margin-bottom: 4%;
  margin-left: 0%;
  font-size: 50px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 44px;
  line-height: 41px;
  word-break: break-word;
`;
export const ButtonContainer = styled.TouchableOpacity`
  margin-top: 33%;
  margin-left: 13%;
`;
export const ButtonPasswordContainer = styled.TouchableOpacity`
  margin-top: 4%;
  margin-left: 0%;
`;
export const ButtonEmailContainer = styled.TouchableOpacity`
  margin-top: 4%;
  margin-left: 0%;
`;
export const ButtonPhoneContainer = styled.TouchableOpacity`
  margin-top: 2%;
  margin-left: 0%;
`;
export const EmailText = styled.Text`
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin-top: -10%;

  color: #000000;
`;

export const ButtonBlank = styled.TouchableOpacity`
  box-sizing: border-box;
  height: 0px;
  width: 500px;
  border: 0.5px;
`;
export const ButtonBottomContainer = styled.TouchableOpacity`
  margin-top: 2%;
  margin-left: 0%;
`;

export const MagentaButtonContainer = styled.View`
  flex-direction: top;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50%;
`;
export const LogoContainer = styled.ImageBackground`
  width: 50px;
  height: 60px;
  margin-top: 25px;
`;
export const IconContainer = styled.View`
  margin-left: 90%;
  margin-top: 10%;
`;
