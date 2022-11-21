import React from 'react';
import { ReviewRow, PriceEditContainer, DateIdContainer } from './styles';
import { Colors } from '../../../assets/Colors';
import { Body_1_Text, H3_Subheading } from '../../../assets/Fonts';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const VoucherCard = (props: any) => {
  return (
    <ReviewRow>
      <DateIdContainer>
        <Body_1_Text>ID {props.id}</Body_1_Text>
        <Body_1_Text>{props.date}</Body_1_Text>
      </DateIdContainer>
      <PriceEditContainer>
        <H3_Subheading>$ {props.amount}</H3_Subheading>
      </PriceEditContainer>
      <MaterialCommunityIcons
        name="pencil-outline"
        size={25}
        color={Colors.darkGray}
      />
    </ReviewRow>
  );
};
