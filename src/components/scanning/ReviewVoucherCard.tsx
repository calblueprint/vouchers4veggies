import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../../assets/Colors';
import { Body1Text } from '../../../assets/Fonts';
import { LeftAlignContainer, Styles } from '../transactions/styles';
import { Row } from '../common/styles';
import { formatValueForDisplay } from '../../utils/displayUtils';
import MediumSemiBoldText from './styles';

type ReviewVoucherCardProps = {
  serialNumber: number;
  value: number;
  onEdit: () => void;
  onDelete: () => void;
};
export default function ReviewVoucherCard({
  serialNumber,
  value,
  onEdit,
  onDelete,
}: ReviewVoucherCardProps) {
  return (
    <Row>
      <LeftAlignContainer>
        <Body1Text>{`SN ${serialNumber}`}</Body1Text>
        <MediumSemiBoldText>{`$${formatValueForDisplay(
          value,
        )}`}</MediumSemiBoldText>
      </LeftAlignContainer>

      <Icon
        name="edit"
        size={25}
        style={Styles.icon}
        color={Colors.midGray}
        onPress={onEdit}
      />

      <Icon
        name="delete"
        size={25}
        style={Styles.icon}
        color={Colors.midGray}
        onPress={onDelete}
      />
    </Row>
  );
}
