import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Dialog from 'react-native-dialog';
import {
  ButtonTextWhite,
  H2Heading,
  H3Subheading,
  H5Subheading2,
  LoadingText,
} from '../../../assets/Fonts';
import {
  BorderlessRow,
  LeftAlignContainer,
  RightAlignContainer,
  ReviewButtonContainer,
  ConstrainedHeightContainer,
  LoadingContainer,
} from './styles';
import {
  ButtonMagenta,
  CardContainer,
  SafeArea,
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
import StandardHeader from '../../components/common/StandardHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function ReviewScreen({
  navigation,
}: ScannerStackScreenProps<'ReviewScreen'>) {
  const { vendorUuid } = useAuthContext();
  const { voucherMap, dispatch } = useScanningContext();

  const [deleteDialogIsVisible, setDeleteDialogIsVisible] = useState(false);
  const [editDialogIsVisible, setEditDialogIsVisible] = useState(false);
  const [invalidDialogIsVisible, setInvalidDialogIsVisible] = useState(false);
  const [emptyInvoiceDialogIsVisible, setEmptyInvoiceDialogIsVisible] =
    useState(false);

  const [editDialogText, setEditDialogText] = useState('');
  const [focusedSerialNumber, setFocusedSerialNumber] = useState(0);
  const [isProcessing, setProcessingInvoice] = useState(false);

  const voucherArray = Array.from(
    voucherMap,
    ([serialNumber, voucherData]) => ({
      serialNumber,
      voucherData,
    }),
  );

  const setSerialNumber = (serialNumber: number) => {
    setFocusedSerialNumber(serialNumber);
  };

  const showEditDialog = () => {
    setEditDialogIsVisible(true);
    setEditDialogText('');
  };

  const onSubmitVoucherAmount = async () => {
    setEditDialogIsVisible(false);
    try {
      if (editDialogText) {
        const isValid = await validateVoucherAmount(
          focusedSerialNumber,
          editDialogText,
        );

        const newValue = Math.round(
          parseFloat(editDialogText.replace(',', '.')) * 100,
        );

        if (isValid) {
          editVoucher(dispatch, focusedSerialNumber, newValue);
        } else {
          throw new Error('Invalid Voucher Amount');
        }
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

  const onSubmit = async () => {
    // redirect user if the invoice is empty
    const { size } = voucherMap;
    if (size === 0) {
      setEmptyInvoiceDialogIsVisible(true);
      return;
    }

    if (vendorUuid) {
      setProcessingInvoice(true);
      await Promise.all(
        voucherArray.map(item =>
          createVoucher({
            serialNumber: item.serialNumber,
            vendorUuid,
            value: item.voucherData.value,
            type: item.voucherData.type,
          }),
        ),
      );

      createTransaction({
        status: TransactionStatus.UNPAID,
        voucherSerialNumbers: Array.from(voucherMap.keys()),
        vendorUuid,
      });
    }
    setProcessingInvoice(false);
    navigation.navigate('ConfirmationScreen', {
      count: voucherMap.size,
    });
  };

  return (
    <SafeArea>
      <StandardHeader>
        <BackButton onPress={() => navigation.goBack()} />
      </StandardHeader>

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
          <Dialog.Button
            label="Delete"
            color={Colors.alertRed}
            bold
            onPress={onDeleteHelper}
          />
        </Dialog.Container>
      ) : null}

      {emptyInvoiceDialogIsVisible ? (
        <Dialog.Container visible>
          <Dialog.Title>This invoice is empty.</Dialog.Title>
          <Dialog.Button
            label="Discard"
            bold
            color={Colors.alertRed}
            onPress={() => navigation.popToTop()}
          />
        </Dialog.Container>
      ) : null}

      {isProcessing ? (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Submitting Invoice</LoadingText>
        </LoadingContainer>
      ) : (
        <CardContainer>
          <StartOfListView />
          <ScrollView>
            <ConstrainedHeightContainer>
              {voucherArray.map(item => (
                <ReviewVoucherCard
                  key={item.serialNumber}
                  serialNumber={item.serialNumber}
                  value={item.voucherData.value}
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
                    (total, voucher) => total + voucher.voucherData.value,
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
      )}
    </SafeArea>
  );
}
