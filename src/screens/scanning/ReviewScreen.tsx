import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import Dialog from 'react-native-dialog';
import { H2Heading } from '../../../assets/Fonts';
import { SafeArea } from './styles';
import { CardContainer, StartOfListView } from '../../../assets/Components';
import Colors from '../../../assets/Colors';
import { ScannerStackScreenProps } from '../../navigation/types';
import { useScanningContext } from './ScanningContext';
import ReviewVoucherCard from '../../components/scanning/ReviewVoucherCard';
import { validateVoucherAmount } from '../../utils/validationUtils';
import { deleteVoucher, editVoucher } from '../../utils/scanningUtils';
import BackButton from '../../components/common/BackButton';

export default function ReviewScreen({
  navigation,
}: ScannerStackScreenProps<'ReviewScreen'>) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const [deleteDialogIsVisible, setDeleteDialogIsVisible] = useState(false);
  const [editDialogIsVisible, setEditDialogIsVisible] = useState(false);
  const [editDialogText, setEditDialogText] = useState('0');

  const [focusedSerialNumber, setFocusedSerialNumber] = useState(0);
  const { voucherMap, dispatch } = useScanningContext();
  const voucherArray = Array.from(voucherMap, ([serialNumber, value]) => ({
    serialNumber,
    value,
  }));

  const setSerialNumber = (serialNumber: number) => {
    setFocusedSerialNumber(serialNumber);
  };

  const showEditDialog = () => {
    setEditDialogIsVisible(true);
    setEditDialogText('0');
  };

  const onSubmitVoucherAmount = () => {
    setEditDialogIsVisible(false);
    try {
      if (editDialogText) {
        validateVoucherAmount(editDialogText);
        const newValue = Math.round(
          parseFloat(editDialogText.replace(',', '.')) * 100,
        );
        editVoucher(dispatch, focusedSerialNumber, newValue);
      }
    } catch (error) {
      // Alert.alert('Invalid voucher amount.', undefined, [{ text: 'Close' }]);
    }
  };

  const showDeleteDialog = () => {
    setDeleteDialogIsVisible(true);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogIsVisible(false);
  };

  const onDeleteHelper = () => {
    deleteVoucher(dispatch, focusedSerialNumber);
    hideDeleteDialog();
  };

  return (
    <SafeArea>
      {BackButton(() => navigation.goBack())}

      <H2Heading>Review vouchers</H2Heading>
      <H2Heading>{`Focused: ${focusedSerialNumber}`}</H2Heading>

      {editDialogIsVisible ? (
        <Dialog.Container visible>
          <Dialog.Title>Enter Number</Dialog.Title>
          <Dialog.Description>Edit voucher amount</Dialog.Description>
          <Dialog.Input
            placeholderTextColor={Colors.midGray}
            onChangeText={input => setEditDialogText(input)}
            secureTextEntry={false}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="0.00"
            keyboardType="decimal-pad"
            returnKeyType="done"
          />
          <Dialog.Button label="Submit" onPress={onSubmitVoucherAmount} />
        </Dialog.Container>
      ) : null}

      {deleteDialogIsVisible ? (
        <Dialog.Container visible>
          <Dialog.Title>
            Are you sure you want to delete this voucher?
          </Dialog.Title>
          <Dialog.Button label="Cancel" onPress={hideDeleteDialog} />
          <Dialog.Button label="Delete" bold onPress={onDeleteHelper} />
        </Dialog.Container>
      ) : null}

      <CardContainer>
        <StartOfListView />
        <FlatList
          data={voucherArray}
          renderItem={({ item }) => (
            <ReviewVoucherCard
              serialNumber={item.serialNumber}
              value={item.value}
              showEditDialog={showEditDialog}
              showDeleteDialog={showDeleteDialog}
              setSerialNumber={setSerialNumber}
            />
          )}
          keyExtractor={item => item.serialNumber.toString()}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      </CardContainer>
    </SafeArea>
  );
}
