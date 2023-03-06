import React from 'react';
import { Body1Text } from '../../../assets/Fonts';
import { DateContainer, Row, Body1SemiboldText } from './styles';

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
