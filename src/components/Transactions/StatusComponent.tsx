import React from 'react';
import { TransactionStatus } from '../../types/types';
import {
  GreenText,
  RedText,
  StatusComponentGreen,
  StatusComponentRed,
} from './styles';

type StatusComponentProps = {
  status: string;
};
export default function StatusComponent({ status }: StatusComponentProps) {
  return status === TransactionStatus.PAID ? (
    <StatusComponentGreen>
      <GreenText>{status.toUpperCase()}</GreenText>
    </StatusComponentGreen>
  ) : (
    <StatusComponentRed>
      <RedText>{status.toUpperCase()}</RedText>
    </StatusComponentRed>
  );
}
