import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../../assets/Colors';
import {
  Body_1_Text,
  Body_2_Subtext,
  H3_Subheading,
} from '../../../assets/Fonts';
import {
  CountContainer,
  DateIdContainer,
  PriceContainer,
  Row,
  Styles,
} from './styles';
import { AntDesign } from '@expo/vector-icons';

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
        <Body_2_Subtext>ID {id}</Body_2_Subtext>
        <Body_1_Text style={Styles.bold}>{date}</Body_1_Text>
        <Row>
          <Body_2_Subtext>Status: </Body_2_Subtext>
          <Body_2_Subtext style={status === 'paid' ? Styles.green : Styles.red}>
            {status}
          </Body_2_Subtext>
        </Row>
      </DateIdContainer>
      <CountContainer>
        <Body_1_Text style={Styles.bold}>x{count}</Body_1_Text>
      </CountContainer>
      <PriceContainer>
        <H3_Subheading style={Styles.semibold}>${price}</H3_Subheading>
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
