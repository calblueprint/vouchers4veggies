import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';

// eslint-disable-next-line import/prefer-default-export
export const HeadingContainer = styled.Text`
  margin-top: 23%;
  margin-bottom: 4%;
  margin-left: 30px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-size: 44px;
  line-height: 41px;
  flex-wrap: wrap-reverse;
`;
export const ButtonContainer = styled.TouchableOpacity`
  margin-top: 30%;
  margin-left: 30px;
`;
export const ButtonPasswordContainer = styled.TouchableOpacity`
  margin-top: 4%;
  margin-left: 0px;
`;
export const ButtonEmailContainer = styled.TouchableOpacity`
  margin-top: 4%;
  margin-left: 0px;
`;
export const ButtonPhoneContainer = styled.TouchableOpacity`
  margin-top: 4%;
  margin-left: 0px;
`;
export const EmailText = styled.Text`
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin-top: -8%;

  color: #000000;
`;

export const ButtonBlank = styled.TouchableOpacity`
  box-sizing: border-box;
  height: 0px;
  width: 500px;
  border: 0.5px;
`;
export const ButtonBottomContainer = styled.TouchableOpacity`
  margin-top: 3%;
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
  margin-left: 30px;
`;
export const IconContainer = styled.View`
  margin-top: 4%;
  flex-direction: row-reverse;
`;

export const EmailHeadingContainer = styled.View`
  margin-top: 30%;
  margin-left: 32%;
`;
export const InputFieldStyling = styled.View`
margin-top: 20%
  margin-left: 18%;
`;
export const GrayButtonContainer = styled.TouchableOpacity`
  margin-left: 21%;
  margin-top: 35%;
`;
export const IconBackContainer = styled.View`
  margin-top: 20%;
  margin-left: 20%;
`;
export const PhoneHeadingContainer = styled.View`
  margin-top: 30%;
  margin-left: 15%;
`;
