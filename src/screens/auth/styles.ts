import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const StartContainer = styled.View`
  top: 25%;
`;

export const BodyContainer = styled.View`
  padding-horizontal: 49px;
`;

export const TextContainer = styled.View`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

export const StartButtonContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;
`;

export const ButtonContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 24px;
`;

export const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
});
