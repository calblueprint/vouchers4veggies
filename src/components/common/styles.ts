import styled from 'styled-components/native';

export type CustomProps = {
  isSelected: boolean;
};

export const RootNavBackButton = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  width: 70px;
  padding: 9px;
`;
