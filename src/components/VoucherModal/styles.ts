import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';

export default StyleSheet.create({
  mainView: {
    position: 'absolute',
    width: '92.5%',
    // height: "40%",
    top: '23%',
    left: '4%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F2F2F2',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
  },
});

export const SafeArea = styled.SafeAreaView`
  background-color: ${Colors.offWhite};
  min-height: 100%;
`;

export const Modal = styled.Modal`
  flex: 1;
  background-color: ${Colors.midGray};
`;

export const TopContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const MessageContainer = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const DeleteButton = styled.TouchableOpacity``;

export const OKButton = styled.TouchableOpacity``;

export const MessageText = styled.Text`
  font-family: 'manrope-semiBold';
  font-size: 16px;
`;

export const DeleteText = styled.Text``;

export const OKText = styled.Text``;
