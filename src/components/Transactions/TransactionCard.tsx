import React from 'react';
import { View } from 'react-native';
import {
  H3_Subheading,
  Body_2_Subtext,
  Body_1_Text,
} from '../../../assets/Fonts';
import { Colors } from '../../../assets/Colors';
import {
  Row,
  DateIdContainer,
  CountContainer,
  PriceContainer,
  Styles,
} from './styles';
import { AntDesign } from '@expo/vector-icons';

export const TransactionCard = (props: any) => {
  return (
    <Row>
      <DateIdContainer>
        <Body_2_Subtext>ID {props.id}</Body_2_Subtext>
        <Body_1_Text style={Styles.bold}>{props.date}</Body_1_Text>
        <Row>
          <Body_2_Subtext>Status: </Body_2_Subtext>
          <Body_2_Subtext
            style={props.status === 'paid' ? Styles.green : Styles.red}
          >
            {props.status}
          </Body_2_Subtext>
        </Row>
      </DateIdContainer>
      <CountContainer>
        <Body_1_Text style={Styles.bold}>x{props.count}</Body_1_Text>
      </CountContainer>
      <PriceContainer>
        <H3_Subheading style={Styles.semibold}>${props.price}</H3_Subheading>
      </PriceContainer>
      <AntDesign.Button
        name="right"
        size={25}
        style={Styles.IconButton}
        color={Colors.midGray}
      />
    </Row>
  );
};
