import React from 'react';
import { Body2Subtext } from '../../../assets/Fonts';
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
      <GreenText>
        <Body2Subtext>{status.toUpperCase()}</Body2Subtext>
      </GreenText>
    </StatusComponentGreen>
  ) : (
    <StatusComponentRed>
      <RedText>
        <Body2Subtext>{status.toUpperCase()}</Body2Subtext>
      </RedText>
    </StatusComponentRed>
  );
}
