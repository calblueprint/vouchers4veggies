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
        <Body1Text style={Styles.bold}>${value / 100}</Body1Text>
        <Body1Text>SN {serialNumber}</Body1Text>
      </DateContainer>
    </Row>
  );
}
