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

export const TitleContainer = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const LeftAlignContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  padding-left: 29px;
`;
export const IconContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  padding-left: 29px;
`;

export const Styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    paddingRight: 12,
  },
});
