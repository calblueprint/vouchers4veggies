import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const HeadingContainer = styled.Text`
  margin-top: 34px;
  margin-bottom: 31px;
  text-align: center;
`;
export const MagentaButtonContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 180px;
  width: 100%;
`;
export const MainProfileContainer = styled.View`
  margin-left: 32px;
  margin-right: 32px;
`;

export const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    paddingRight: 12,
  },
});
