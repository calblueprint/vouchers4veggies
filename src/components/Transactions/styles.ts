import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

export const Row = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 67px;
  border: 0px solid ${Colors.lightGray};
  border-bottom-width: 1px;
`;

export const DateContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  padding-left: 29px;
`;

export const StatusContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
  margin-right: 30px;
`;

export const ValueContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const StatusComponentRed = styled.View`
  text-align: center;
  align-items: center;
  border-radius: 9px;
  width: 63px;
  background: ${Colors.alertLightRed};
  padding: 9px 9px;
  border: 2px solid ${Colors.alertLightRed};
`;

export const StatusComponentGreen = styled.View`
  text-align: center;
  align-items: center;
  border-radius: 9px;
  width: 63px;
  background: ${Colors.lightGreen};
  padding: 9px 9px;
  border: 2px solid ${Colors.lightGreen};
`;

export const Body1SemiboldText = styled.Text`
  font-family: 'manrope-semiBold';
  font-style: normal;
  font-size: 14px;
  line-height: 19px;
`;

export const GreenText = styled.Text`
  color: ${Colors.alertGreen};
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 12px;
  line-height: 14px;
`;

export const RedText = styled.Text`
  color: ${Colors.alertRed};
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 12px;
  line-height: 14px;
`;

export const Styles = StyleSheet.create({
  IconButton: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
