import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/Colors';

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const StartContainer = styled.View`
  top: 24.35%;
  align-items: center;
`;

export const LogoContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  margin-left: 7.73%;
  margin-top: 2.83%;
`;

export const HeadingContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  margin-top: 4.03%;
  margin-bottom: 2.46%;
`;

export const FormContainer = styled.View`
  width: 73.87%;
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6.15%;
`;

export const VerticalSpacingContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 2.71%;
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
});