import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';

export const SafeArea = styled.SafeAreaView`
  background-color: ${Colors.offWhite};
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

export const Header = styled.View`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`;

export const LogoContainer = styled.ImageBackground`
  width: 50px;
  height: 60px;
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

export const PageContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleContainer = styled.View`
  padding-bottom: 12px;
`;

export const BodyContainer = styled.View`
  width: 277px;
  align-items: center;
  margin-bottom: 35px;
`;

export const ButtonMagenta = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  border-width: 2px;
  border-radius: 5px;
  width: 277px;
  background: ${Colors.magenta};
  padding: 9px 9px;
  border-color: ${Colors.magenta};
  margin-bottom: 16px;
`;

export const Container = styled.ScrollView`
  width: 100%;
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;
