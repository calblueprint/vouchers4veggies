import React from 'react';
import { Body1Text } from '../../../assets/Fonts';
import { formatValueForDisplay } from '../../utils/displayUtils';
import { LeftAlignColumn, H4Subheading } from './styles';
import { Card } from '../../../assets/Components';
import { RightAlignContainer } from '../common/styles';

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
