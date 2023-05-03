import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../assets/Colors';
import { Body1Text } from '../../../assets/Fonts';
import { LeftAlignColumn, Styles } from '../transactions/styles';
import { Card } from '../../../assets/Components';
import { formatValueForDisplay } from '../../utils/displayUtils';
import MediumSemiBoldText from './styles';

type ReviewVoucherCardProps = {
  serialNumber: number;
  value: number;
  showEditDialog: () => void;
  showDeleteDialog: () => void;
  setSerialNumber: (serialNumber: number) => void;
};
export default function ReviewVoucherCard({
  serialNumber,
  value,
  showEditDialog,
  showDeleteDialog,
  setSerialNumber,
}: ReviewVoucherCardProps) {
  const onEdit = () => {
    showEditDialog();
    setSerialNumber(serialNumber);
  };

  const onDelete = () => {
    showDeleteDialog();
    setSerialNumber(serialNumber);
  };

  return (
    <Card>
      <LeftAlignColumn>
        <Body1Text>{`SN ${serialNumber}`}</Body1Text>
        <MediumSemiBoldText>{`$${formatValueForDisplay(
          value,
        )}`}</MediumSemiBoldText>
      </LeftAlignColumn>

      <AntDesign.Button
        name="edit"
        size={25}
        style={Styles.iconWithPadding}
        color={Colors.midGray}
        onPress={onEdit}
      />

      <AntDesign.Button
        name="delete"
        size={25}
        style={Styles.iconWithPadding}
        color={Colors.midGray}
        onPress={onDelete}
      />
    </Card>
  );
}
