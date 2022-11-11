import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../assets/Colors';

export const Row = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

export const DateIdContainer = styled.View`
  flex: 4;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  padding-left: 20px;
`;

export const CountContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 10px;
  margin-right: 30px;
`;

export const PriceContainer = styled.View`
  flex: 2;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 10px;
`;

export const Styles = StyleSheet.create({
  FormField: {
    width: '100%',
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    padding: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  FormFieldFocus: {
    width: '100%',
    borderWidth: 2,
    // borderColor: 'black',
    // borderStyle: 'solid',
    borderColor: Colors.magenta,
    backgroundColor: Colors.offWhite,
    padding: 5,
    marginTop: 10,
    marginBottom: 20,
  },
});
