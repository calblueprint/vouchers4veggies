import React from 'react';
import { ReviewRow, PriceEditContainer, DateIdContainer } from './styles';
import Colors from '../../../assets/Colors';
import { Body1Text, H3Subheading } from '../../../assets/Fonts';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const VoucherCard = (props: any) => {
  return (
    <ReviewRow>
      <DateIdContainer>
        <Body1Text>ID {props.id}</Body1Text>
        <Body1Text>{props.date}</Body1Text>
      </DateIdContainer>
      <PriceEditContainer>
        <H3Subheading>$ {props.amount}</H3Subheading>
      </PriceEditContainer>
      <MaterialCommunityIcons
        name="pencil-outline"
        size={25}
        color={Colors.darkGray}
      />
    </ReviewRow>
  );
};
