import React from 'react';
import { Body1Text } from '../../../assets/Fonts';
import { formatValueForDisplay } from '../../utils/displayUtils';
import {
  LeftAlignContainer,
  RightAlignContainer,
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
      <LeftAlignContainer>
        <Body1Text>SN {serialNumber}</Body1Text>
      </LeftAlignContainer>
      <RightAlignContainer>
        <H4Subheading>${formatValueForDisplay(value)}</H4Subheading>
      </RightAlignContainer>
    </Row>
  );
}
