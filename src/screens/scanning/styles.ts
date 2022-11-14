import { BarCodeScanner } from 'expo-barcode-scanner';
import styled from 'styled-components/native';
import { Colors } from '../../../assets/Colors';

export const ScannerContainer = styled.View`
  width: 277px;
  height: 277px;
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

export const TopContainer = styled.View`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
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
  margin: 5%;
  background-color: ${Colors.offWhite};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 125px;
`;

export const TitleContainer = styled.View`
  padding-bottom: 12px;
`;

export const HeaderContainer = styled.View`
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
`;

export const Container = styled.ScrollView`
  width: 100%;
`;
