import styled from 'styled-components/native';

export const ContentContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const VerticalSpacingContainer = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const HorizontalSpacingContainer = styled.View`
  padding-left: 15px;
  padding-right: 15px;
`;

export const RightButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  padding-top: 40px;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 60px;
`;
