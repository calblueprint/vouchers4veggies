import React from 'react';
import { Body1Text } from '../../../assets/Fonts';
import { formatValueForDisplay } from '../../utils/displayUtils';
import {
  LeftAlignContainerWithMargin,
  RightAlignContainerWithMargin,
  H4Subheading,
} from './styles';
import { Row } from '../../../assets/Components';

type VoucherCardProps = {
  serialNumber: number;
  value: number;
};
export default function VoucherCard({ serialNumber, value }: VoucherCardProps) {
  return (
    <Row>
      <LeftAlignContainerWithMargin>
        <Body1Text>SN {serialNumber}</Body1Text>
      </LeftAlignContainerWithMargin>
      <RightAlignContainerWithMargin>
        <H4Subheading>${formatValueForDisplay(value)}</H4Subheading>
      </RightAlignContainerWithMargin>
    </Row>
  );
}
