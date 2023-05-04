import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../assets/Colors';
import { H4SubheadingSemibold, Body1Text } from '../../../assets/Fonts';
import { Card, Column } from '../../../assets/Components';
import { formatValueForDisplay } from '../../utils/displayUtils';
import { IconContainer, styles } from './styles';

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
      <Column>
        <Body1Text>{`SN ${serialNumber}`}</Body1Text>
        <H4SubheadingSemibold>{`${formatValueForDisplay(
          value,
        )}`}</H4SubheadingSemibold>
      </Column>

      <IconContainer>
        <AntDesign.Button
          name="edit"
          size={25}
          style={styles.icon}
          color={Colors.midGray}
          onPress={onEdit}
        />
      </IconContainer>
      <IconContainer>
        <AntDesign.Button
          name="delete"
          size={25}
          style={styles.icon}
          color={Colors.midGray}
          onPress={onDelete}
        />
      </IconContainer>
    </Card>
  );
}
