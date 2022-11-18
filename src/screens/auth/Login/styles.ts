import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/Colors';

export const LoginContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const LogoContainer = styled.View`
  margin-left: 30;
  margin-top: 20;
`;

export const HeadingContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  margin-top: 35;
  margin-bottom: 25;
`;

export const FormContainer = styled.View`
  width: 277;
  height: 50%;
`;

export const RowContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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

export const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 35;
  margin-bottom: 25;
`;

export const VerticalSpacingContainer = styled.View`
  margin-top: 25;
`;

export const WhiteText = styled.Text`
  color: ${Colors.offWhite};
`;

export const Styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
  bold: {
    fontWeight: '600',
  },
});
