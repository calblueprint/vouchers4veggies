import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/Colors';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const StartContainer = styled.View`
  top: 20%;
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
  margin-top: 35px;
  margin-bottom: 25px;
`;

export const FormContainer = styled.View`
  width: 277px;
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
  margin-top: 35px;
  margin-bottom: 25px;
`;

export const VerticalSpacingContainer = styled.View`
  margin-top: 25px;
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
