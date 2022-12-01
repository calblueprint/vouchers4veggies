import React from 'react';
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
import Icon from 'react-native-vector-icons/AntDesign';

export const TransactionCard = (props: any) => {
  return (
    <Row>
      <DateIdContainer>
        <Body_2_Subtext>ID {props.id}</Body_2_Subtext>
        <Body_1_Text>{props.date}</Body_1_Text>
      </DateIdContainer>
      <CountContainer>
        <Body_1_Text>x{props.count}</Body_1_Text>
      </CountContainer>
      <PriceContainer>
        <H3_Subheading>${props.price}</H3_Subheading>
      </PriceContainer>
      <Icon.Button
        name="right"
        size={25}
        style={Styles.IconButton}
        color={Colors.midGray}
      />
    </Row>
  );
};
