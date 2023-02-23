import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';

export const SafeArea = styled.SafeAreaView`
  background-color: ${Colors.offWhite};
  min-height: 100%;
  align-items: center;
  flex: 1;
`;

export const Header = styled.View`
  width: 85%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`;

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
  width: 277px;
  align-items: center;
  margin-bottom: 35px;
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
  margin-top: 20px;
  margin-bottom: 20px;
`;

// will be used later
export const FieldContainer = styled.View``;

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
