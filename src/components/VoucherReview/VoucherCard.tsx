/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { ReviewRow, PriceEditContainer, DateIdContainer } from './styles';
import Colors from '../../../assets/Colors';
import { Body1Text, H3Subheading } from '../../../assets/Fonts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function VoucherCard(props: any) {
  return (
    <ReviewRow>
      <DateIdContainer>
        <Body1Text>ID {props.id}</Body1Text>
        <Body1Text>{props.date}</Body1Text>
      </DateIdContainer>
      <PriceEditContainer>
        <H3Subheading>$ {props.amount}</H3Subheading>
      </PriceEditContainer>
      <Feather name="trash-2" size={25} color={Colors.midGray} />
    </ReviewRow>
  );
}

export default VoucherCard;
