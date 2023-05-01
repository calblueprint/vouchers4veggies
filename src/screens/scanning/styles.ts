import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';
import { CustomProps } from '../../components/common/styles';

export const VoucherCounter = styled.View`
  width: 30px;
  height: 30px;
  background: ${Colors.lightMagenta});
  border: 1px solid ${Colors.brightMagenta};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BodyContainer = styled.View`
  margin: 20px 0px;
  width: 277px;
  align-items: center;
`;

export const TitleContainer = styled.View`
  padding-bottom: 12px;
`;

export const ScannerContainer = styled.View`
  width: 277px;
  height: 237px;
  background: ${Colors.offWhite};
  border: 2px solid ${Colors.lightMagenta};
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

export const FormContainer = styled.View`
  width: 277px;
`;

export const BorderlessRow = styled.View`
  margin-top: 10px;
  display: flex;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const LeftAlignContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding-left: 29px;
`;

export const RightAlignContainer = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  padding-right: 29px;
`;

export const ReviewTitleContainer = styled.View`
  display: flex;
  padding-top: 12px;
  padding-bottom: 40px;
`;

export const ConfirmationTitleContainer = styled.View`
  display: flex;
  padding: 40px;
  padding-top: 200px;
`;

export const ConstrainedHeightContainer = styled.View`
  width: 100%;
  min-height: 268px;
`;

export const ReviewButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
`;

export const ErrorContainer = styled.View`
  width: 100%;
  height: 15px;
  margin: 10px 0px;
`;

export const RedText = styled.Text`
  color: ${Colors.alertRed};
`;

export const RangeInputContainer = styled.View`
  width: 120px;
`;

export const VoucherRangeContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 6px;
`;

// TODO: refactor to use selene's dropdown component
export const DropDownContainer = styled.View`
  width: 277px;
  height: 35px;
  background: ${Colors.offWhite};
  border: 2px solid ${Colors.lightMagenta};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 8px;
`;

export const StartContainer = styled.View`
  top: 193px;
  margin: 0px 49px;
`;

export const HeroContainer = styled.View`
  margin-bottom: 40px;
`;

export const VoucherCountContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 277px;
`;

export const LoadingContainer = styled.View`
  margin-top: 80px;
  height: 100px;
  display: flex;
  flex-drection: row;
  justify-content: flex-start;
  align-items: center;
`;

export const NavButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const NavButton = styled.Pressable`
  width: 33.333%;
  border-bottom-width: 3px;
  border-color: ${(props: CustomProps) =>
    props.isSelected ? Colors.magenta : Colors.lightGray};
`;
