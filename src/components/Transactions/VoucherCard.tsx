import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Colors from '../../../assets/Colors';
import { Body1Text, H3Subheading } from '../../../assets/Fonts';
import {
  StatusContainer,
  DateContainer,
  ValueContainer,
  Row,
  Styles,
  Body1SemiboldText,
} from './styles';
import StatusComponent from './StatusComponent';
import { TransactionStackParamList } from '../../navigation/types';

type VoucherCardProps = {
  serialNumber: number;
  value: number;
};
export default function VoucherCard({ serialNumber, value }: VoucherCardProps) {
  return (
    <Row>
      <DateContainer>
        <Body1SemiboldText>${(value / 100).toFixed(2)}</Body1SemiboldText>
        <Body1Text>SN {serialNumber}</Body1Text>
      </DateContainer>
    </Row>
  );
}
