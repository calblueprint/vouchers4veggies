import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../assets/Colors';
import { Body1Text } from '../../../assets/Fonts';
import { LeftAlignContainer, Styles } from '../transactions/styles';
import { Row } from '../common/styles';
import { formatValueForDisplay } from '../../utils/displayUtils';
import MediumSemiBoldText from './styles';
import { validateVoucherAmount } from '../../utils/validationUtils';
import { editVoucher, deleteVoucher } from '../../utils/scanningUtils';
import { useScanningContext } from '../../screens/scanning/ScanningContext';

type ReviewVoucherCardProps = {
  serialNumber: number;
  value: number;
};
export default function ReviewVoucherCard({
  serialNumber,
  value,
}: ReviewVoucherCardProps) {
  const { dispatch } = useScanningContext();

  const onSubmitVoucherAmount = (input: string | undefined) => {
    try {
      if (input) {
        validateVoucherAmount(input);
        const newValue = parseFloat(input.replace(',', '.')) * 100;
        editVoucher(dispatch, serialNumber, newValue);
      }
    } catch (error) {
      Alert.alert('Invalid voucher amount.', undefined, [{ text: 'Close' }]);
    }
  };

  const onEdit = () => {
    Alert.prompt(
      'Enter Number',
      'Edit voucher amount',
      [{ text: 'Submit', onPress: onSubmitVoucherAmount }],
      'plain-text',
      '0',
      'decimal-pad',
    );
  };

  const onDeleteHelper = () => {
    deleteVoucher(dispatch, serialNumber);
  };

  const onDelete = () => {
    Alert.alert('Are you sure you want to delete this voucher?', undefined, [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: onDeleteHelper,
        style: 'destructive',
      },
    ]);
  };

  return (
    <Row>
      <LeftAlignContainer>
        <Body1Text>{`SN ${serialNumber}`}</Body1Text>
        <MediumSemiBoldText>{`$${formatValueForDisplay(
          value,
        )}`}</MediumSemiBoldText>
      </LeftAlignContainer>

      <AntDesign.Button
        name="edit"
        size={25}
        style={Styles.icon}
        color={Colors.midGray}
        onPress={onEdit}
      />

      <AntDesign.Button
        name="delete"
        size={25}
        style={Styles.icon}
        color={Colors.midGray}
        onPress={onDelete}
      />
    </Row>
  );
}
