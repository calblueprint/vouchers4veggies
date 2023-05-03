import React from 'react';
import { Body1Text, H4Subheading } from '../../../assets/Fonts';
import { formatValueForDisplay } from '../../utils/displayUtils';
import { LeftAlignColumn } from './styles';
import { Card, RightAlignContainer } from '../../../assets/Components';

type VoucherCardProps = {
  serialNumber: number;
  value: number;
};
export default function VoucherCard({ serialNumber, value }: VoucherCardProps) {
  return (
    <Card>
      <LeftAlignColumn>
        <Body1Text>SN {serialNumber}</Body1Text>
      </LeftAlignColumn>
      <RightAlignContainer style={{ marginRight: 29 }}>
        <H4Subheading>${formatValueForDisplay(value)}</H4Subheading>
      </RightAlignContainer>
    </Card>
  );
}
