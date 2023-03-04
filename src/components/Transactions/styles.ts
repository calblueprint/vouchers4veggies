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
`;

export const DateContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  padding-left: 20px;
`;

export const StatusContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 10px;
  margin-right: 30px;
`;

export const ValueContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 10px;
`;

export const Styles = StyleSheet.create({
  IconButton: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  bold: {
    fontWeight: '600',
  },
  semibold: {
    fontWeight: '500',
  },
  green: {
    color: Colors.alertGreen,
  },
  red: {
    color: Colors.alertRed,
  },
});
