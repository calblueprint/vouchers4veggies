import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';

export const LogoContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  margin-left: 15%;
`;

export const TransactionsContainer = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${Colors.offWhite};
`;

export const TitleContainer = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 42px;
  line-height: 57px;
  text-align: center;
`;

export const CardContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StartOfListView = styled.View`
  width: 100%;
  height: 1px;
  border: 0px solid ${Colors.lightGray};
  border-top-width: 1px;
`;

export const BackButtonContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 10%;
  margin-top: 15%;
`;

export const LeftAlignedContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 29px;
`;

export const MediumText = styled.Text`
  font-family: 'manrope-regular';
  font-style: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
`;

export const Body1BoldText = styled.Text`
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 14px;
  line-height: 19px;
`;

export const DarkGrayText = styled.Text`
  color: ${Colors.darkGray};
`;
