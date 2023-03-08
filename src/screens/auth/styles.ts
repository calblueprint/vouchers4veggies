import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';

export const LoginContainer = styled.View`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const StartContainer = styled.View`
  top: 25%;
  align-items: center;
`;

export const HeadingContainer = styled.View`
  margin-top: 14%;
  align-items: left;
  margin-bottom: 10%;
`;

export const FormContainer = styled.View`
  width: 75%;
`;

export const RowContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const VerticalSpacingContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 4%;
`;

export const LeftAlignContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: flex-start;
  align-content: center;
`;

export const RightAlignContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
  align-content: center;
`;

export const VerticalSpacingButtonContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 12%;
`;

export const ButtonContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5%;
`;

export const BackButtonContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 10%;
  margin-top: 15%;
`;

export const SmallTextContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6%;
`;

export const WhiteText = styled.Text`
  color: ${Colors.offWhite};
`;

export const DarkGrayText = styled.Text`
  color: ${Colors.darkGray};
`;

export const Styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
  bold: {
    fontWeight: '600',
  },
  errorText: {
    color: Colors.alertRed,
  },
});
