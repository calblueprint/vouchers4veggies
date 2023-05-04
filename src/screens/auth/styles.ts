import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const StartContainer = styled.View`
  top: 26%;
`;

export const HeadingContainer = styled.View`
  align-items: flex-start;
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

export const VerticalSpacingButtonContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15%;
`;

export const ButtonContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5%;
`;

export const SmallTextContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6%;
`;

export const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
});

export const ButtonSpacing = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;
`;
export const StartLogoContainer = styled.ImageBackground`
  width: 100px;
  height: 100px;
`;
