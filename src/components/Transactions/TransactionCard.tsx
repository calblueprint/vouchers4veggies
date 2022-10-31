import React from 'react';
import {
  H3_Subheading,
  Body_2_Subtext,
  Body_1_Text,
} from '../../../assets/Fonts';
import { Colors } from '../../../assets/Colors';
import {
  Row,
  LeftContentContainer,
  RightContentContainer,
  LongRightContentContainer,
  Styles,
} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

export const TransactionCard = (props: any) => {
  return (
    <Row>
      <LeftContentContainer>
        <Body_2_Subtext>ID {props.id}</Body_2_Subtext>
        <Body_1_Text>{props.date}</Body_1_Text>
      </LeftContentContainer>
      <RightContentContainer>
        <Body_1_Text>x{props.count}</Body_1_Text>
      </RightContentContainer>
      <LongRightContentContainer>
        <H3_Subheading>${props.price}</H3_Subheading>
      </LongRightContentContainer>
      <Icon.Button
        name="right"
        size={25}
        style={Styles.IconButton}
        color={Colors.midGray}
      />
    </Row>
  );
};
