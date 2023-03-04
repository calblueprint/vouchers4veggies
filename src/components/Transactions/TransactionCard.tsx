import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../assets/Colors';
import { Body1Text, Body2Subtext, H3Subheading } from '../../../assets/Fonts';
import {
  CountContainer,
  DateIdContainer,
  PriceContainer,
  Row,
  Styles,
} from './styles';

type TransactionCardProps = {
  date: string;
  id: string;
  price: number;
  count: number;
  status: string;
};
export default function TransactionCard({
  date,
  id,
  price,
  count,
  status,
}: TransactionCardProps) {
  return (
    <Row>
      <DateIdContainer>
        <Body2Subtext>ID {id}</Body2Subtext>
        <Body1Text style={Styles.bold}>{date}</Body1Text>
        <Row>
          <Body2Subtext>Status: </Body2Subtext>
          <Body2Subtext style={status === 'paid' ? Styles.green : Styles.red}>
            {status}
          </Body2Subtext>
        </Row>
      </DateIdContainer>
      <CountContainer>
        <Body1Text style={Styles.bold}>x{count}</Body1Text>
      </CountContainer>
      <PriceContainer>
        <H3Subheading style={Styles.semibold}>${price}</H3Subheading>
      </PriceContainer>
      <AntDesign.Button
        name="right"
        size={25}
        style={Styles.IconButton}
        color={Colors.midGray}
      />
    </Row>
  );
}
