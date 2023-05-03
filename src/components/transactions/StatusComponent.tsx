import React from 'react';
import { TransactionStatus } from '../../types/types';
import { StatusComponentGreen, StatusComponentRed } from './styles';
import {
  Body2SemiboldSubtext,
  GreenText,
  RedText,
} from '../../../assets/Fonts';

type StatusComponentProps = {
  status: string;
};
export default function StatusComponent({ status }: StatusComponentProps) {
  return status === TransactionStatus.PAID ? (
    <StatusComponentGreen>
      <GreenText>
        <Body2SemiboldSubtext>{status.toUpperCase()}</Body2SemiboldSubtext>
      </GreenText>
    </StatusComponentGreen>
  ) : (
    <StatusComponentRed>
      <RedText>
        <Body2SemiboldSubtext>{status.toUpperCase()}</Body2SemiboldSubtext>
      </RedText>
    </StatusComponentRed>
  );
}
