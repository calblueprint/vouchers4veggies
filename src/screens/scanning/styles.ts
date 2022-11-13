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

export const PageContainer = styled.View`
  margin: 5%;
  background-color: ${Colors.offWhite};
  flex: 1;
  align-items: center;
  justify-content: center;
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
