import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Dialog from 'react-native-dialog';
import {
  ButtonTextWhite,
  H2Heading,
  H3Subheading,
  H5Subheading2,
} from '../../../assets/Fonts';
import {
  BorderlessRow,
  LeftAlignContainer,
  RightAlignContainer,
  SafeArea,
  ReviewTitleContainer,
  ReviewButtonContainer,
  ConstrainedHeightContainer,
} from './styles';
import {
  ButtonMagenta,
  CardContainer,
  StartOfListView,
} from '../../../assets/Components';
import Colors from '../../../assets/Colors';
import { ScannerStackScreenProps } from '../../navigation/types';
import { useScanningContext } from './ScanningContext';
import ReviewVoucherCard from '../../components/scanning/ReviewVoucherCard';
import { validateVoucherAmount } from '../../utils/validationUtils';
import { deleteVoucher, editVoucher } from '../../utils/scanningUtils';
import BackButton from '../../components/common/BackButton';
import { formatValueForDisplay } from '../../utils/displayUtils';
import { createTransaction, createVoucher } from '../../database/queries';
import { TransactionStatus } from '../../types/types';
import { useAuthContext } from '../auth/AuthContext';

export default function ReviewScreen({
  navigation,
}: ScannerStackScreenProps<'ReviewScreen'>) {
  const { vendorUuid } = useAuthContext();
  const { voucherMap, dispatch } = useScanningContext();

  const [deleteDialogIsVisible, setDeleteDialogIsVisible] = useState(false);
  const [editDialogIsVisible, setEditDialogIsVisible] = useState(false);
  const [invalidDialogIsVisible, setInvalidDialogIsVisible] = useState(false);

  const [editDialogText, setEditDialogText] = useState('');
  const [focusedSerialNumber, setFocusedSerialNumber] = useState(0);

  const voucherArray = Array.from(voucherMap, ([serialNumber, value]) => ({
    serialNumber,
    value,
  }));

  const setSerialNumber = (serialNumber: number) => {
    setFocusedSerialNumber(serialNumber);
  };

  const showEditDialog = () => {
    setEditDialogIsVisible(true);
    setEditDialogText('');
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
      setInvalidDialogIsVisible(true);
    }
  };

  const onCloseInvalidValueDialog = () => {
    setInvalidDialogIsVisible(false);
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

  const onSubmit = () => {
    if (vendorUuid) {
      voucherMap.forEach((serialNumber, value) => {
        createVoucher({
          serialNumber,
          vendorUuid,
          value,
        });
      });
      createTransaction({
        status: TransactionStatus.UNPAID,
        voucherSerialNumbers: Array.from(voucherMap.keys()),
        vendorUuid,
      });
    }

    navigation.navigate('ConfirmationScreen', {
      count: voucherMap.size,
    });
  };

  return (
    <SafeArea>
      {BackButton(() => navigation.goBack())}

      <ReviewTitleContainer>
        <H2Heading>Review vouchers</H2Heading>
      </ReviewTitleContainer>

      {editDialogIsVisible ? (
        <Dialog.Container visible>
          <Dialog.Title>Enter Number</Dialog.Title>
          <Dialog.Description>Edit voucher amount</Dialog.Description>
          <Dialog.Input
            placeholderTextColor={Colors.midGray}
            onChangeText={(input: string) => setEditDialogText(input)}
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

      {invalidDialogIsVisible ? (
        <Dialog.Container visible>
          <Dialog.Title>Invalid voucher amount.</Dialog.Title>
          <Dialog.Button label="Close" onPress={onCloseInvalidValueDialog} />
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
        <ScrollView>
          <ConstrainedHeightContainer>
            {voucherArray.map(item => (
              <ReviewVoucherCard
                key={item.serialNumber}
                serialNumber={item.serialNumber}
                value={item.value}
                showEditDialog={showEditDialog}
                showDeleteDialog={showDeleteDialog}
                setSerialNumber={setSerialNumber}
              />
            ))}
          </ConstrainedHeightContainer>

          <BorderlessRow>
            <LeftAlignContainer>
              <H5Subheading2>Amount</H5Subheading2>
            </LeftAlignContainer>
            <RightAlignContainer>
              <H3Subheading>{`x${voucherMap.size}`}</H3Subheading>
            </RightAlignContainer>
          </BorderlessRow>

          <BorderlessRow>
            <LeftAlignContainer>
              <H5Subheading2>Total</H5Subheading2>
            </LeftAlignContainer>
            <RightAlignContainer>
              <H3Subheading>{`$${formatValueForDisplay(
                voucherArray.reduce(
                  (total, voucher) => total + voucher.value,
                  0,
                ),
              )}`}</H3Subheading>
            </RightAlignContainer>
          </BorderlessRow>

          <ReviewButtonContainer>
            <ButtonMagenta onPress={onSubmit}>
              <ButtonTextWhite>Submit</ButtonTextWhite>
            </ButtonMagenta>
          </ReviewButtonContainer>
        </ScrollView>
      </CardContainer>
    </SafeArea>
  );
}
