import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
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
  price: string;
  count: number;
};
export default function TransactionCard({
  date,
  id,
  price,
  count,
}: TransactionCardProps) {
  return (
    <Row>
      <DateIdContainer>
        <Body2Subtext>{`ID ${id}`}</Body2Subtext>
        <Body1Text>{date}</Body1Text>
      </DateIdContainer>
      <CountContainer>
        <Body1Text>{`x${count}`}</Body1Text>
      </CountContainer>
      <PriceContainer>
        <H3Subheading>{`$${price}`}</H3Subheading>
      </PriceContainer>
      <Icon.Button
        name="right"
        size={25}
        style={Styles.IconButton}
        color={Colors.midGray}
      />
    </Row>
  );
}
