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

export function TransactionCard(props: any) {
  return (
    <Row>
      <DateIdContainer>
        <Body2Subtext>ID {props.id}</Body2Subtext>
        <Body1Text>{props.date}</Body1Text>
      </DateIdContainer>
      <CountContainer>
        <Body1Text>x{props.count}</Body1Text>
      </CountContainer>
      <PriceContainer>
        <H3Subheading>${props.price}</H3Subheading>
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
