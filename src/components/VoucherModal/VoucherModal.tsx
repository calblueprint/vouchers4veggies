import * as React from 'react';
import { Modal, Alert, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles, {
  ButtonContainer,
  DeleteButton,
  DeleteText,
  MessageContainer,
  MessageText,
  OKButton,
  OKText,
  TopContainer,
} from './styles';

export default function VoucherModal({ modalVisible, setModalVisible }) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View style={styles.mainView}>
          <TopContainer>
            <Icon name="closecircleo" />
          </TopContainer>
          <MessageContainer>
            <Icon name="checkcircleo" size={100} />
            <MessageText>Voucher scanned!</MessageText>
          </MessageContainer>
          <ButtonContainer>
            <DeleteButton>
              <DeleteText>Delete</DeleteText>
            </DeleteButton>
            <OKButton>
              <OKText>OK</OKText>
            </OKButton>
          </ButtonContainer>
        </View>
      </View>
    </Modal>
  );
}
