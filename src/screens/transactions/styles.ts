import styled from 'styled-components/native';

export const Title = styled.Text`
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 42px;
  line-height: 57px;
  text-align: center;
`;

export const LeftAlignContainerWithMargins = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 29px;
  margin-bottom: 13px;
`;

export const MediumText = styled.Text`
  font-family: 'manrope-regular';
  font-style: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
`;

export const Size14BoldText = styled.Text`
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 14px;
  line-height: 19px;
`;

export const CenteredOneLine = styled.View`
  display: flex;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const LeftAlignContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
`;

export const RightAlignContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
`;

export const VerticalSpaceContainer = styled.View`
  height: 21px;
`;
