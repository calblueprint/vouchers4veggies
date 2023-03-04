import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../assets/Colors';
import { Body1Text, Body2Subtext, H3Subheading } from '../../../assets/Fonts';
import {
  StatusContainer,
  DateContainer,
  ValueContainer,
  Row,
  Styles,
} from './styles';

type TransactionCardProps = {
  date: Date;
  id: string;
  value: number;
  status: string;
};
export default function TransactionCard({
  date,
  id,
  value,
  status,
}: TransactionCardProps) {
  return (
    <Row>
      <DateContainer>
        <Body1Text style={Styles.bold}>
          {date.toLocaleString('en-US', { dateStyle: 'short' })}
        </Body1Text>
        <Body1Text style={Styles.bold}>
          {date.toLocaleString('en-US', { timeStyle: 'short' })}
        </Body1Text>
      </DateContainer>

      <ValueContainer>
        <H3Subheading style={Styles.semibold}>${value / 100}</H3Subheading>
      </ValueContainer>

      <StatusContainer>
        <Body1Text style={Styles.bold}>{status}</Body1Text>
      </StatusContainer>

      <AntDesign.Button
        name="right"
        size={25}
        style={Styles.IconButton}
        color={Colors.midGray}
      />
    </Row>
  );
}
