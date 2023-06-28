import React from 'react';
import { InvoiceStatus } from '../../types/types';
import { StatusComponentGreen, StatusComponentRed } from './styles';
import {
  Body2SubtextSemibold,
  GreenText,
  RedText,
} from '../../../assets/Fonts';

type StatusComponentProps = {
  status: string;
};
export default function StatusComponent({ status }: StatusComponentProps) {
  return status === InvoiceStatus.PAID ? (
    <StatusComponentGreen>
      <GreenText>
        <Body2SubtextSemibold>{status.toUpperCase()}</Body2SubtextSemibold>
      </GreenText>
    </StatusComponentGreen>
  ) : (
    <StatusComponentRed>
      <RedText>
        <Body2SubtextSemibold>{status.toUpperCase()}</Body2SubtextSemibold>
      </RedText>
    </StatusComponentRed>
  );
}
