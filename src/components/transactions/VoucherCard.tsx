import React from 'react';
import { Body1Text, H4Subheading } from '../../../assets/Fonts';
import { formatValueForDisplay } from '../../utils/displayUtils';
import {
  Card,
  LeftAlignContainer,
  RightAlignContainer,
} from '../../../assets/Components';

type VoucherCardProps = {
  serialNumber: number;
  value: number;
};
export default function VoucherCard({ serialNumber, value }: VoucherCardProps) {
  const displayValue = formatValueForDisplay(value);
  return (
    <Card>
      <LeftAlignContainer>
        <Body1Text>SN {serialNumber}</Body1Text>
      </LeftAlignContainer>
      <RightAlignContainer>
        <H4Subheading>${displayValue}</H4Subheading>
      </RightAlignContainer>
    </Card>
  );
}
